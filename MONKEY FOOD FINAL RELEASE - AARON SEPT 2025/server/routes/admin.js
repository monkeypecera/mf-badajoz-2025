const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const path = require('path');

// Proteger todas las rutas de administración
router.use(adminAuth);

// Ruta para servir la página de administración
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/admin.html'));
});

module.exports = router;