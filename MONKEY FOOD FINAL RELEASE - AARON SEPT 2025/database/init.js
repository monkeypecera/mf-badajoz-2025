/**
 * Script para inicializar la base de datos con los datos necesarios
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Prize = require('../server/models/Prize');
const { initializePrizes } = require('../server/controllers/prizeController');

// Función para inicializar la base de datos
async function initializeDatabase() {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conexión a la base de datos establecida');

    // Insertar premios iniciales - Total 1000 premios ganadores
    const prizes = [
      { name: 'NO PREMIADO', description: 'Sin premio esta vez, ¡sigue intentando!', probability: 80, quantity: 4000 },
      { name: 'HAMBURGUESA CLASICA GRATIS', description: '¡Disfruta de una hamburguesa clásica completamente gratis!', probability: 1, quantity: 50 },
      { name: 'PATATAS GRATIS', description: '¡Patatas fritas gratis para ti!', probability: 1, quantity: 50 },
      { name: '5% DESCUENTO', description: '5% de descuento en tu próxima compra*', probability: 10, quantity: 500 },
    { name: '10% DESCUENTO', description: '10% de descuento en tu próxima compra*', probability: 6, quantity: 300 },
    { name: '20% DESCUENTO', description: '20% de descuento en tu próxima compra*', probability: 2, quantity: 100 }
    ];

    // Limpiar premios existentes
    await Prize.deleteMany({});
    console.log('Premios existentes eliminados');

    // Insertar nuevos premios
    await Prize.insertMany(prizes);
    console.log('Premios inicializados correctamente');

    // Cerrar la conexión a la base de datos
    await mongoose.connection.close();
    console.log('Conexión a la base de datos cerrada');
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

// Ejecutar la función de inicialización
initializeDatabase();