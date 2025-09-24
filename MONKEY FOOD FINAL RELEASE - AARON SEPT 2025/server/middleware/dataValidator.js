/**
 * Middleware para validación de datos
 */

// Validar formato de email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};



// Validar nombre
const isValidName = (name) => {
  // Nombre debe tener al menos 3 caracteres y no contener caracteres especiales excepto espacios y acentos
  const nameRegex = /^[\p{L}\s]{3,50}$/u;
  return nameRegex.test(name);
};

// Sanitizar datos para prevenir inyección
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Eliminar caracteres potencialmente peligrosos
  return input
    .replace(/[<>]/g, '') // Eliminar < y > para prevenir HTML
    .replace(/[\r\n\t]/g, ' ') // Reemplazar saltos de línea y tabs con espacios
    .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno solo
    .trim(); // Eliminar espacios al inicio y final
};

// Middleware para validar datos del participante
exports.validateParticipantData = (req, res, next) => {
  try {
    const { name, email } = req.body;
    const errors = [];
    
    // Sanitizar datos
    req.body.name = sanitizeInput(name);
    req.body.email = sanitizeInput(email);
    
    // Validar nombre
    if (!req.body.name) {
      errors.push('El nombre es obligatorio');
    } else if (!isValidName(req.body.name)) {
      errors.push('El nombre debe tener al menos 3 caracteres y no contener caracteres especiales');
    }
    
    // Validar email
    if (!req.body.email) {
      errors.push('El email es obligatorio');
    } else if (!isValidEmail(req.body.email)) {
      errors.push('El formato del email no es válido');
    }
    

    
    // Si hay errores, devolver respuesta con errores
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Datos de participante inválidos',
        errors
      });
    }
    
    // Si todo está bien, continuar
    next();
  } catch (error) {
    console.error('Error en la validación de datos:', error);
    res.status(500).json({
      success: false,
      error: 'Error en la validación de datos'
    });
  }
};

// Middleware para prevenir ataques de fuerza bruta
const requestCounts = {};
const MAX_REQUESTS = 10;
const TIME_WINDOW = 60 * 1000; // 1 minuto

exports.rateLimiter = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Inicializar contador para esta IP si no existe
  if (!requestCounts[ip]) {
    requestCounts[ip] = {
      count: 0,
      resetTime: Date.now() + TIME_WINDOW
    };
  }
  
  // Reiniciar contador si ha pasado el tiempo
  if (Date.now() > requestCounts[ip].resetTime) {
    requestCounts[ip] = {
      count: 0,
      resetTime: Date.now() + TIME_WINDOW
    };
  }
  
  // Incrementar contador
  requestCounts[ip].count++;
  
  // Verificar si ha excedido el límite
  if (requestCounts[ip].count > MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      error: 'Demasiadas solicitudes. Por favor, inténtalo de nuevo más tarde.'
    });
  }
  
  next();
};