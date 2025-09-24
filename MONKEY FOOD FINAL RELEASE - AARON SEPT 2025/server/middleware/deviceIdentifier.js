/**
 * Middleware para identificar dispositivos únicos
 */

const { getDeviceId } = require('../utils/deviceIdentifier');
const Participant = require('../models/Participant');

// Middleware para añadir el ID del dispositivo a la solicitud
exports.addDeviceId = (req, res, next) => {
  try {
    // Obtener el ID del dispositivo
    const deviceId = getDeviceId(req);
    
    // Añadir el ID del dispositivo a la solicitud
    req.deviceId = deviceId;
    
    next();
  } catch (error) {
    console.error('Error al obtener el ID del dispositivo:', error);
    next();
  }
};

// Middleware para verificar si un dispositivo ya ha participado
exports.checkParticipation = async (req, res, next) => {
  try {
    // Obtener el ID del dispositivo del cuerpo de la solicitud o generar uno nuevo
    const deviceId = req.body.deviceId || req.deviceId || getDeviceId(req);
    
    // Asegurar que el deviceId esté disponible en la solicitud
    req.deviceId = deviceId;
    
    // Verificar si el dispositivo ya ha participado
    const existingParticipant = await Participant.findOne({ deviceId });
    
    // Añadir la información a la solicitud
    req.hasParticipated = !!existingParticipant;
    req.participant = existingParticipant;
    
    next();
  } catch (error) {
    console.error('Error al verificar la participación del dispositivo:', error);
    next();
  }
};

// Middleware para limitar la participación a un dispositivo
exports.limitParticipation = async (req, res, next) => {
  try {
    // Si el dispositivo ya ha participado, devolver un error
    if (req.hasParticipated) {
      return res.status(400).json({
        success: false,
        error: 'Ya has participado desde este dispositivo',
        participant: {
          name: req.participant.name,
          hasWon: req.participant.hasWon
        }
      });
    }
    
    next();
  } catch (error) {
    console.error('Error al limitar la participación del dispositivo:', error);
    next();
  }
};