/**
 * Middleware para protección contra inyección SQL
 */

// Función para sanitizar strings y prevenir inyección SQL
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  
  // Escapar caracteres especiales que podrían usarse en inyección SQL
  return str
    .replace(/[\\\/%'"]/g, '\\$&') // Escapar caracteres especiales
    .replace(/;/g, '') // Eliminar punto y coma
    .replace(/--/g, '') // Eliminar comentarios SQL
    .replace(/\bdrop\b/gi, '') // Eliminar palabra clave DROP
    .replace(/\bdelete\b/gi, '') // Eliminar palabra clave DELETE
    .replace(/\bupdate\b/gi, '') // Eliminar palabra clave UPDATE
    .replace(/\binsert\b/gi, '') // Eliminar palabra clave INSERT
    .replace(/\bselect\b/gi, '') // Eliminar palabra clave SELECT
    .replace(/\bunion\b/gi, '') // Eliminar palabra clave UNION
    .replace(/\bexec\b/gi, '') // Eliminar palabra clave EXEC
    .replace(/\bexecute\b/gi, ''); // Eliminar palabra clave EXECUTE
};

// Middleware para sanitizar parámetros de consulta
exports.sanitizeQueryParams = (req, res, next) => {
  // Sanitizar parámetros de consulta
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      req.query[key] = sanitizeString(req.query[key]);
    });
  }
  
  // Sanitizar parámetros de ruta
  if (req.params) {
    Object.keys(req.params).forEach(key => {
      req.params[key] = sanitizeString(req.params[key]);
    });
  }
  
  next();
};

// Middleware para sanitizar cuerpo de la solicitud
exports.sanitizeRequestBody = (req, res, next) => {
  // Sanitizar cuerpo de la solicitud
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    });
  }
  
  next();
};