/**
 * Middleware para protección contra CSRF (Cross-Site Request Forgery)
 */

// Middleware para verificar el token CSRF
exports.verifyCSRFToken = (req, res, next) => {
  // Solo verificar en métodos que modifican datos (POST, PUT, DELETE)
  if (req.method === 'GET') {
    return next();
  }
  
  // Obtener el token CSRF de los headers o del cuerpo de la solicitud
  const csrfToken = req.headers['x-csrf-token'] || req.body.csrf_token;
  
  // Verificar si el token existe
  if (!csrfToken) {
    return res.status(403).json({
      success: false,
      error: 'Token CSRF no proporcionado'
    });
  }
  
  // Verificar si el token coincide con el almacenado en la sesión
  // Nota: En una implementación real, se verificaría contra un token almacenado en la sesión del servidor
  // Como este es un ejemplo simplificado, solo verificamos que el token exista
  
  // Si todo está bien, continuar
  next();
};