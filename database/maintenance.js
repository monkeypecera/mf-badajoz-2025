/**
 * Script para realizar operaciones de mantenimiento en la base de datos
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Prize = require('../server/models/Prize');
const Participant = require('../server/models/Participant');

// Función para restablecer los premios a sus cantidades iniciales
async function resetPrizes() {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conexión a la base de datos establecida');

    // Obtener todos los premios
    const prizes = await Prize.find();
    
    // Restablecer las cantidades
    for (const prize of prizes) {
      prize.quantity = prize.initialQuantity;
      await prize.save();
    }

    console.log('Premios restablecidos correctamente');

    // Cerrar la conexión a la base de datos
    await mongoose.connection.close();
    console.log('Conexión a la base de datos cerrada');
    process.exit(0);
  } catch (error) {
    console.error('Error al restablecer los premios:', error);
    process.exit(1);
  }
}

// Función para limpiar los participantes
async function clearParticipants() {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conexión a la base de datos establecida');

    // Eliminar todos los participantes
    await Participant.deleteMany({});
    console.log('Participantes eliminados correctamente');

    // Cerrar la conexión a la base de datos
    await mongoose.connection.close();
    console.log('Conexión a la base de datos cerrada');
    process.exit(0);
  } catch (error) {
    console.error('Error al eliminar los participantes:', error);
    process.exit(1);
  }
}

// Función para mostrar estadísticas
async function showStats() {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conexión a la base de datos establecida');

    // Obtener estadísticas de premios
    const prizes = await Prize.find();
    console.log('\nEstadísticas de premios:');
    for (const prize of prizes) {
      console.log(`- ${prize.name}: ${prize.quantity}/${prize.initialQuantity} disponibles`);
    }

    // Obtener estadísticas de participantes
    const totalParticipants = await Participant.countDocuments();
    const winners = await Participant.countDocuments({ hasWon: true });
    const nonWinners = await Participant.countDocuments({ hasWon: false });

    console.log('\nEstadísticas de participantes:');
    console.log(`- Total de participantes: ${totalParticipants}`);
    console.log(`- Ganadores: ${winners}`);
    console.log(`- No ganadores: ${nonWinners}`);
    console.log(`- Tasa de ganadores: ${totalParticipants > 0 ? (winners / totalParticipants * 100).toFixed(2) : 0}%`);

    // Cerrar la conexión a la base de datos
    await mongoose.connection.close();
    console.log('\nConexión a la base de datos cerrada');
    process.exit(0);
  } catch (error) {
    console.error('Error al mostrar estadísticas:', error);
    process.exit(1);
  }
}

// Procesar los argumentos de la línea de comandos
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Uso: node maintenance.js [reset-prizes|clear-participants|stats]');
  process.exit(1);
}

switch (args[0]) {
  case 'reset-prizes':
    resetPrizes();
    break;
  case 'clear-participants':
    clearParticipants();
    break;
  case 'stats':
    showStats();
    break;
  default:
    console.log('Comando no reconocido. Uso: node maintenance.js [reset-prizes|clear-participants|stats]');
    process.exit(1);
}