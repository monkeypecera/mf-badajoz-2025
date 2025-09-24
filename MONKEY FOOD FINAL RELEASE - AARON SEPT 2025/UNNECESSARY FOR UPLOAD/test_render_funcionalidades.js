#!/usr/bin/env node

/**
 * Test de Funcionalidades en Render
 * Prueba registro de participantes y envío de emails
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./database/db');
const Participant = require('./database/models/Participant');
const Prize = require('./database/models/Prize');
const { initializePrizes } = require('./server/controllers/prizeController');
const { sendWinnerEmail, sendTestEmail } = require('./server/utils/emailService');
const { getRandomPrize } = require('./server/utils/prizeUtils');

console.log('🧪 INICIANDO TEST DE FUNCIONALIDADES EN RENDER...');
console.log('=' .repeat(60));

// Función para probar conexión y datos de MongoDB
async function testMongoDB() {
  console.log('\n🗄️  PROBANDO MONGODB:');
  console.log('-'.repeat(40));
  
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('✅ Conexión a MongoDB establecida');
    
    // Inicializar premios
    await initializePrizes();
    console.log('✅ Premios inicializados');
    
    // Contar documentos existentes
    const participantCount = await Participant.countDocuments();
    const prizeCount = await Prize.countDocuments();
    
    console.log(`📊 Participantes en BD: ${participantCount}`);
    console.log(`🎁 Premios en BD: ${prizeCount}`);
    
    // Listar algunos participantes recientes
    if (participantCount > 0) {
      const recentParticipants = await Participant.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('prize');
      
      console.log('\n👥 Últimos 5 participantes:');
      recentParticipants.forEach((p, index) => {
        console.log(`   ${index + 1}. ${p.name} (${p.email}) - ${p.prize ? p.prize.name : 'Sin premio'}`);
      });
    }
    
    // Listar premios disponibles
    const prizes = await Prize.find();
    console.log('\n🎁 Premios disponibles:');
    prizes.forEach((p, index) => {
      console.log(`   ${index + 1}. ${p.name} - Probabilidad: ${p.probability}% - Stock: ${p.stock}`);
    });
    
    return true;
    
  } catch (error) {
    console.log(`❌ Error en MongoDB: ${error.message}`);
    return false;
  }
}

// Función para probar registro de participante
async function testRegistroParticipante() {
  console.log('\n👤 PROBANDO REGISTRO DE PARTICIPANTE:');
  console.log('-'.repeat(40));
  
  try {
    // Datos de prueba
    const testData = {
      name: `Test User ${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      phone: '600123456',
      deviceId: `test-device-${Date.now()}`
    };
    
    console.log(`Registrando: ${testData.name} (${testData.email})`);
    
    // Verificar si ya existe participante con este dispositivo
    const existingParticipant = await Participant.findOne({ deviceId: testData.deviceId });
    if (existingParticipant) {
      console.log('⚠️  Participante ya existe con este dispositivo');
      return true;
    }
    
    // Obtener premio aleatorio
    const prize = await getRandomPrize();
    console.log(`🎁 Premio asignado: ${prize ? prize.name : 'Sin premio'}`);
    
    // Crear participante
    const participant = new Participant({
      name: testData.name,
      email: testData.email,
      phone: testData.phone,
      deviceId: testData.deviceId,
      prize: prize ? prize._id : null,
      hasWon: !!prize
    });
    
    await participant.save();
    console.log('✅ Participante registrado exitosamente');
    console.log(`   ID: ${participant._id}`);
    console.log(`   ¿Ganó?: ${participant.hasWon ? 'SÍ' : 'NO'}`);
    
    return { participant, prize };
    
  } catch (error) {
    console.log(`❌ Error al registrar participante: ${error.message}`);
    return false;
  }
}

// Función para probar envío de emails
async function testEnvioEmails(participant, prize) {
  console.log('\n📧 PROBANDO ENVÍO DE EMAILS:');
  console.log('-'.repeat(40));
  
  try {
    // Test 1: Email de prueba básico
    console.log('Enviando email de prueba básico...');
    const testResult = await sendTestEmail(process.env.CORPORATE_EMAIL);
    
    if (testResult.success) {
      console.log('✅ Email de prueba enviado exitosamente');
    } else {
      console.log(`❌ Error en email de prueba: ${testResult.error}`);
      return false;
    }
    
    // Test 2: Email de ganador (si aplica)
    if (participant && participant.hasWon && prize) {
      console.log(`Enviando email de ganador a ${participant.email}...`);
      
      const winnerResult = await sendWinnerEmail(
        participant.email,
        participant.name,
        prize
      );
      
      if (winnerResult.success) {
        console.log('✅ Email de ganador enviado exitosamente');
        console.log(`   Código de premio: ${winnerResult.prizeCode}`);
      } else {
        console.log(`❌ Error en email de ganador: ${winnerResult.error}`);
      }
    } else {
      console.log('ℹ️  No se envía email de ganador (participante no ganó)');
    }
    
    return true;
    
  } catch (error) {
    console.log(`❌ Error al probar emails: ${error.message}`);
    return false;
  }
}

// Función para limpiar datos de prueba
async function limpiarDatosPrueba() {
  console.log('\n🧹 LIMPIANDO DATOS DE PRUEBA:');
  console.log('-'.repeat(40));
  
  try {
    // Eliminar participantes de prueba (últimos 5 minutos)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const result = await Participant.deleteMany({
      email: { $regex: /test.*@example\.com/ },
      createdAt: { $gte: fiveMinutesAgo }
    });
    
    console.log(`🗑️  Eliminados ${result.deletedCount} participantes de prueba`);
    
  } catch (error) {
    console.log(`⚠️  Error al limpiar datos: ${error.message}`);
  }
}

// Función para mostrar estadísticas finales
async function mostrarEstadisticas() {
  console.log('\n📊 ESTADÍSTICAS FINALES:');
  console.log('-'.repeat(40));
  
  try {
    const totalParticipants = await Participant.countDocuments();
    const winners = await Participant.countDocuments({ hasWon: true });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayParticipants = await Participant.countDocuments({
      createdAt: { $gte: today }
    });
    
    console.log(`👥 Total participantes: ${totalParticipants}`);
    console.log(`🏆 Total ganadores: ${winners}`);
    console.log(`📅 Participantes hoy: ${todayParticipants}`);
    console.log(`📈 Tasa de ganadores: ${totalParticipants > 0 ? ((winners / totalParticipants) * 100).toFixed(2) : 0}%`);
    
    // Premios más ganados
    const prizeStats = await Participant.aggregate([
      { $match: { hasWon: true, prize: { $ne: null } } },
      { $group: { _id: '$prize', count: { $sum: 1 } } },
      { $lookup: { from: 'prizes', localField: '_id', foreignField: '_id', as: 'prizeInfo' } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    if (prizeStats.length > 0) {
      console.log('\n🎁 Premios más ganados:');
      prizeStats.forEach((stat, index) => {
        const prizeName = stat.prizeInfo[0]?.name || 'Premio desconocido';
        console.log(`   ${index + 1}. ${prizeName}: ${stat.count} veces`);
      });
    }
    
  } catch (error) {
    console.log(`❌ Error al obtener estadísticas: ${error.message}`);
  }
}

// Función principal
async function ejecutarTest() {
  try {
    console.log(`🚀 Entorno: ${process.env.NODE_ENV || 'production'}`);
    console.log(`📅 Fecha: ${new Date().toLocaleString('es-ES')}`);
    
    // Test 1: MongoDB
    const mongoOK = await testMongoDB();
    if (!mongoOK) {
      console.log('\n❌ MongoDB falló, abortando tests');
      process.exit(1);
    }
    
    // Test 2: Registro de participante
    const registroResult = await testRegistroParticipante();
    if (!registroResult) {
      console.log('\n❌ Registro de participante falló');
    }
    
    // Test 3: Envío de emails
    let emailOK = false;
    if (registroResult && typeof registroResult === 'object') {
      emailOK = await testEnvioEmails(registroResult.participant, registroResult.prize);
    } else {
      emailOK = await testEnvioEmails(null, null);
    }
    
    // Limpiar datos de prueba
    await limpiarDatosPrueba();
    
    // Mostrar estadísticas
    await mostrarEstadisticas();
    
    // Cerrar conexión
    await mongoose.disconnect();
    
    // Resumen final
    console.log('\n' + '='.repeat(60));
    console.log('🎯 RESUMEN DEL TEST:');
    console.log('='.repeat(60));
    console.log(`MongoDB: ${mongoOK ? '✅ OK' : '❌ ERROR'}`);
    console.log(`Registro: ${registroResult ? '✅ OK' : '❌ ERROR'}`);
    console.log(`Email: ${emailOK ? '✅ OK' : '❌ ERROR'}`);
    
    if (mongoOK && registroResult && emailOK) {
      console.log('\n🎉 ¡TODAS LAS FUNCIONALIDADES FUNCIONAN CORRECTAMENTE!');
      console.log('\n✅ Tu aplicación está lista para recibir participantes');
      process.exit(0);
    } else {
      console.log('\n⚠️  ALGUNAS FUNCIONALIDADES TIENEN PROBLEMAS');
      console.log('\n📋 Revisa las instrucciones en INSTRUCCIONES_RENDER_SOLUCION.md');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('💥 Error inesperado durante el test:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Ejecutar test
ejecutarTest();