require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('../database/db');
const { initializePrizes } = require('./controllers/prizeController');

// Importar rutas
const participantRoutes = require('./routes/participant');
const prizeRoutes = require('./routes/prize');
const adminRoutes = require('./routes/admin');

// Importar middleware
const { addDeviceId } = require('./middleware/deviceIdentifier');
const { verifyCSRFToken } = require('./middleware/csrfProtection');
const { rateLimiter } = require('./middleware/dataValidator');
const { sanitizeQueryParams, sanitizeRequestBody } = require('./middleware/sqlInjectionProtection');
const { setSecurityHeaders } = require('./middleware/securityHeaders');

// Inicializar la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos e inicializar premios
connectDB().then(() => {
  console.log('Conexión a la base de datos establecida');
  initializePrizes().then(() => {
    console.log('Premios inicializados correctamente');
  }).catch(err => {
    console.error('Error al inicializar los premios:', err);
  });
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de seguridad
app.use(setSecurityHeaders); // Configurar cabeceras de seguridad HTTP
app.use(rateLimiter); // Limitar solicitudes para prevenir ataques de fuerza bruta
app.use(verifyCSRFToken); // Protección contra CSRF
app.use(sanitizeQueryParams); // Protección contra inyección SQL en parámetros de consulta
app.use(sanitizeRequestBody); // Protección contra inyección SQL en el cuerpo de la solicitud

// Middleware para identificar dispositivos
app.use(addDeviceId);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/api/participants', participantRoutes);
app.use('/api/prizes', prizeRoutes);
app.use('/admin', adminRoutes);

// Ruta principal para servir la aplicación
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Ruta para términos y condiciones
app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/terms.html'));
});

// Ruta para manejar cualquier otra solicitud
app.get('*', (req, res) => {
  res.redirect('/');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;