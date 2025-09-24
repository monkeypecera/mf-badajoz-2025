/**
 * Utilidades para la aplicación de promoción de Monkey Food
 */

/**
 * Genera un ID único para el dispositivo basado en características del navegador
 * @returns {string} ID único del dispositivo
 */
function getDeviceId() {
  // Intentar obtener el ID del localStorage primero
  let deviceId = localStorage.getItem('monkey_food_device_id');
  
  if (!deviceId) {
    // Generar un nuevo ID basado en características del dispositivo
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');
    
    // Crear un hash simple del fingerprint
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir a 32bit integer
    }
    
    deviceId = 'device_' + Math.abs(hash).toString(36) + '_' + Date.now().toString(36);
    
    // Guardar en localStorage
    localStorage.setItem('monkey_food_device_id', deviceId);
  }
  
  return deviceId;
}

/**
 * Verifica si el dispositivo ya ha participado
 * @returns {Promise<{hasParticipated: boolean}>}
 */
async function checkDeviceParticipation() {
  try {
    const deviceId = getDeviceId();
    const response = await fetch(`/api/participants/check/${deviceId}`);
    
    if (response.ok) {
      const data = await response.json();
      return { hasParticipated: data.hasParticipated };
    } else {
      return { hasParticipated: false };
    }
  } catch (error) {
    console.error('Error al verificar la participación:', error);
    return { hasParticipated: false };
  }
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} True si el email es válido
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formatea un nombre para mostrar
 * @param {string} name - Nombre a formatear
 * @returns {string} Nombre formateado
 */
function formatName(name) {
  return name.trim().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

/**
 * Genera un código de premio único
 * @param {string} participantId - ID del participante
 * @param {string} prizeId - ID del premio
 * @returns {string} Código del premio
 */
function generatePrizeCode(participantId, prizeId) {
  // Tomar los primeros 4 caracteres del ID del participante y los últimos 4 del premio
  const prefix = participantId.substring(0, 4).toUpperCase();
  const suffix = prizeId.substring(prizeId.length - 4).toUpperCase();
  
  // Generar 4 caracteres aleatorios
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  // Combinar todo para formar el código
  return `${prefix}-${randomChars}-${suffix}`;
}