#!/usr/bin/env node

/**
 * Script de Verificación para Render
 * Diagnostica problemas de MongoDB y Email en producción
 */

require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

console.log('🔍 INICIANDO DIAGNÓSTICO DE RENDER...');
console.log('=' .repeat(50));

// Función para verificar variables de entorno
function verificarVariablesEntorno() {
  console.log('\n📋 VERIFICANDO VARIABLES DE ENTORNO:');
  console.log('-'.repeat(40));
  
  const variablesRequeridas = [
    'MONGODB_URI',
    'EMAIL_HOST',
    'EMAIL_PORT', 
    'EMAIL_USER',
    'EMAIL_PASS',
    'CORPORATE_EMAIL',
    'ADMIN_PASSWORD',
    'JWT_SECRET'
  ];
  
  let todasConfiguradas = true;
  
  variablesRequeridas.forEach(variable => {
    const valor = process.env[variable];
    if (valor) {
      console.log(`✅ ${variable}: CONFIGURADA`);
      
      // Mostrar información parcial para variables sensibles
      if (variable === 'MONGODB_URI') {
        console.log(`   URI: ${valor.substring(0, 20)}...`);
      } else if (variable === 'EMAIL_PASS') {
        console.log(`   Pass: ${valor.substring(0, 4)}****`);
      } else if (variable === 'JWT_SECRET') {
        console.log(`   Secret: ${valor.substring(0, 8)}...`);
      } else if (!variable.includes('PASS')) {
        console.log(`   Valor: ${valor}`);
      }
    } else {
      console.log(`❌ ${variable}: NO CONFIGURADA`);
      todasConfiguradas = false;
    }
  });
  
  return todasConfiguradas;
}

// Función para probar conexión a MongoDB
async function probarMongoDB() {
  console.log('\n🗄️  PROBANDO CONEXIÓN A MONGODB:');
  console.log('-'.repeat(40));
  
  try {
    console.log('Intentando conectar...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 segundos timeout
    });
    
    console.log(`✅ MongoDB conectado exitosamente`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Base de datos: ${conn.connection.name}`);
    console.log(`   Estado: ${conn.connection.readyState === 1 ? 'Conectado' : 'Desconectado'}`);
    
    // Probar una consulta simple
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`   Colecciones encontradas: ${collections.length}`);
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    await mongoose.disconnect();
    return true;
    
  } catch (error) {
    console.log(`❌ Error al conectar a MongoDB:`);
    console.log(`   Error: ${error.message}`);
    console.log(`   Código: ${error.code || 'N/A'}`);
    
    if (error.message.includes('authentication failed')) {
      console.log('   💡 Posible problema: Credenciales incorrectas');
    } else if (error.message.includes('timeout')) {
      console.log('   💡 Posible problema: Configuración de red o firewall');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('   💡 Posible problema: URL de conexión incorrecta');
    }
    
    return false;
  }
}

// Función para probar envío de email
async function probarEmail() {
  console.log('\n📧 PROBANDO CONFIGURACIÓN DE EMAIL:');
  console.log('-'.repeat(40));
  
  try {
    console.log('Creando transporter...');
    
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      debug: true, // Habilitar logs detallados
      logger: true
    });
    
    console.log('Verificando configuración...');
    
    // Verificar la configuración del transporter
    const verification = await transporter.verify();
    
    if (verification) {
      console.log('✅ Configuración de email válida');
      console.log(`   Host: ${process.env.EMAIL_HOST}`);
      console.log(`   Puerto: ${process.env.EMAIL_PORT}`);
      console.log(`   Usuario: ${process.env.EMAIL_USER}`);
      
      // Intentar enviar un email de prueba
      console.log('\nEnviando email de prueba...');
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.CORPORATE_EMAIL,
        subject: '🧪 Test de Email desde Render - ' + new Date().toISOString(),
        html: `
          <h2>✅ Test de Email Exitoso</h2>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
          <p><strong>Servidor:</strong> ${process.env.NODE_ENV || 'production'}</p>
          <p><strong>Host:</strong> ${process.env.EMAIL_HOST}</p>
          <p><strong>Puerto:</strong> ${process.env.EMAIL_PORT}</p>
          <p>Este email confirma que la configuración de correo está funcionando correctamente en Render.</p>
        `
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email enviado exitosamente');
      console.log(`   Message ID: ${info.messageId}`);
      console.log(`   Destinatario: ${process.env.CORPORATE_EMAIL}`);
      
      return true;
      
    } else {
      console.log('❌ Configuración de email inválida');
      return false;
    }
    
  } catch (error) {
    console.log(`❌ Error al probar email:`);
    console.log(`   Error: ${error.message}`);
    console.log(`   Código: ${error.code || 'N/A'}`);
    
    if (error.message.includes('Invalid login')) {
      console.log('   💡 Posible problema: Credenciales de Gmail incorrectas');
      console.log('   💡 Solución: Regenerar contraseña de aplicación');
    } else if (error.message.includes('timeout')) {
      console.log('   💡 Posible problema: Render bloquea conexiones SMTP');
      console.log('   💡 Solución: Usar SendGrid o similar');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('   💡 Posible problema: Host SMTP incorrecto');
    }
    
    return false;
  }
}

// Función principal
async function ejecutarDiagnostico() {
  try {
    console.log(`🚀 Entorno: ${process.env.NODE_ENV || 'production'}`);
    console.log(`📅 Fecha: ${new Date().toLocaleString('es-ES')}`);
    
    // Verificar variables de entorno
    const variablesOK = verificarVariablesEntorno();
    
    // Probar MongoDB
    const mongoOK = await probarMongoDB();
    
    // Probar Email
    const emailOK = await probarEmail();
    
    // Resumen final
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESUMEN DEL DIAGNÓSTICO:');
    console.log('='.repeat(50));
    console.log(`Variables de entorno: ${variablesOK ? '✅ OK' : '❌ FALTAN'}`);
    console.log(`Conexión MongoDB: ${mongoOK ? '✅ OK' : '❌ ERROR'}`);
    console.log(`Configuración Email: ${emailOK ? '✅ OK' : '❌ ERROR'}`);
    
    if (variablesOK && mongoOK && emailOK) {
      console.log('\n🎉 ¡TODOS LOS SISTEMAS FUNCIONAN CORRECTAMENTE!');
      process.exit(0);
    } else {
      console.log('\n⚠️  HAY PROBLEMAS QUE NECESITAN ATENCIÓN');
      console.log('\n📋 PRÓXIMOS PASOS:');
      
      if (!variablesOK) {
        console.log('1. Configurar variables de entorno faltantes en Render');
      }
      if (!mongoOK) {
        console.log('2. Verificar credenciales y configuración de MongoDB Atlas');
        console.log('   - Revisar usuario/contraseña');
        console.log('   - Configurar acceso de red (0.0.0.0/0)');
      }
      if (!emailOK) {
        console.log('3. Solucionar configuración de email:');
        console.log('   - Regenerar contraseña de aplicación de Gmail');
        console.log('   - O considerar usar SendGrid');
      }
      
      process.exit(1);
    }
    
  } catch (error) {
    console.error('💥 Error inesperado durante el diagnóstico:', error);
    process.exit(1);
  }
}

// Ejecutar diagnóstico
ejecutarDiagnostico();