/**
 * Utilidad para generar y validar identificadores únicos de dispositivos
 */

// Función para generar un hash a partir de la información del dispositivo
const generateHash = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir a entero de 32 bits
  }
  
  return hash.toString(16);
};

// Función para obtener un identificador único del dispositivo
exports.getDeviceId = (req) => {
  // Intentar obtener información del dispositivo desde la solicitud
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const acceptLanguage = req.headers['accept-language'] || '';
  
  // Combinar la información para crear un identificador único
  const deviceInfo = `${userAgent}|${ip}|${acceptLanguage}`;
  
  // Generar un hash a partir de la información del dispositivo
  return generateHash(deviceInfo);
};

// Función para validar si un dispositivo ya ha participado
exports.validateDevice = async (deviceId, Participant) => {
  try {
    // Verificar si el dispositivo ya existe en la base de datos
    const existingDevice = await Participant.findOne({ deviceId });
    
    return {
      valid: !existingDevice,
      participant: existingDevice
    };
  } catch (error) {
    console.error('Error al validar el dispositivo:', error);
    return {
      valid: false,
      error: 'Error al validar el dispositivo'
    };
  }
};