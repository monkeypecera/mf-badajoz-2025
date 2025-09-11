/**
 * Middleware para configurar cabeceras de seguridad HTTP
 */

// Middleware para configurar cabeceras de seguridad
exports.setSecurityHeaders = (req, res, next) => {
  // Protección contra XSS (Cross-Site Scripting)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Evitar que el navegador detecte automáticamente el tipo MIME
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Remover X-Frame-Options para permitir iframe embedding
  res.removeHeader('X-Frame-Options');
  
  // Política de seguridad de contenido (CSP) - Permitir iframe embedding desde cualquier origen
  res.setHeader('Content-Security-Policy', "frame-ancestors *");
  
  // Política de referencia
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Política de características del navegador
  res.setHeader('Feature-Policy', "camera 'none'; microphone 'none'; geolocation 'none'");
  
  // Continuar con la siguiente función middleware
  next();
};