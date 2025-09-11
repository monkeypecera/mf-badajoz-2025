const express = require('express');
const router = express.Router();
const { 
  registerParticipant, 
  getParticipants, 
  getParticipant, 
  checkDevice,
  getStats,
  sendTestEmail,
  exportParticipants 
} = require('../controllers/participantController');
const { checkParticipation, limitParticipation } = require('../middleware/deviceIdentifier');
const { validateParticipantData, rateLimiter } = require('../middleware/dataValidator');

// Rutas para participantes
router.post('/', rateLimiter, validateParticipantData, checkParticipation, limitParticipation, registerParticipant);
router.get('/', getParticipants);
router.get('/stats', getStats);
router.get('/check/:deviceId', checkDevice);
router.get('/:id', getParticipant);

// Ruta para test de email
router.post('/test-email', sendTestEmail);

// Ruta para exportar participantes
router.get('/export', exportParticipants);

module.exports = router;