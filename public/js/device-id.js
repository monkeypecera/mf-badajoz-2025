/**
 * Utilidad para generar un identificador único del dispositivo
 */

// Función para generar un hash a partir de una cadena
function generateHash(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir a entero de 32 bits
  }
  
  return hash.toString(16);
}

// Función para obtener información del navegador y dispositivo
function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const colorDepth = window.screen.colorDepth;
  const pixelRatio = window.devicePixelRatio || 1;
  
  // Intentar obtener información adicional si está disponible
  let canvas = document.createElement('canvas');
  let gl = null;
  let glInfo = 'unknown';
  
  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        glInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    }
  } catch (e) {
    // Ignorar errores
  }
  
  // Combinar toda la información para crear un identificador único
  return `${userAgent}|${platform}|${language}|${screenWidth}x${screenHeight}|${colorDepth}|${pixelRatio}|${glInfo}`;
}

// Función para obtener o generar un ID de dispositivo
function getDeviceId() {
  // Verificar si ya existe un ID almacenado
  let deviceId = localStorage.getItem('monkey_food_device_id');
  
  // Si no existe, generar uno nuevo
  if (!deviceId) {
    const deviceInfo = getDeviceInfo();
    deviceId = generateHash(deviceInfo);
    localStorage.setItem('monkey_food_device_id', deviceId);
  }
  
  return deviceId;
}

// Función para verificar si el dispositivo ya ha participado
// Modificada para siempre devolver hasParticipated: false y permitir múltiples participaciones
async function checkDeviceParticipation() {
  try {
    const deviceId = getDeviceId();
    // Ya no verificamos en el servidor, siempre permitimos participar
    return {
      hasParticipated: false,
      participant: null
    };
  } catch (error) {
    console.error('Error al verificar la participación del dispositivo:', error);
    return {
      hasParticipated: false,
      error: 'Error al verificar la participación'
    };
  }
}