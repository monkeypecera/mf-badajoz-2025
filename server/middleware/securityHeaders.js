/**
 * Middleware para configurar cabeceras de seguridad HTTP
 */

// Middleware para configurar cabeceras de seguridad
exports.setSecurityHeaders = (req, res, next) => {
  // Protección contra XSS (Cross-Site Scripting)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Evitar que el navegador detecte automáticamente el tipo MIME
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Permitir iframe embedding desde cualquier origen
  // res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Comentado para permitir embedding
  
  // Política de seguridad de contenido (CSP) - Permitir iframe embedding
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://kit.fontawesome.com https://cdnjs.cloudflare.com 'unsafe-inline'; style-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com 'unsafe-inline'; img-src 'self' data:; font-src 'self' https://cdnjs.cloudflare.com; frame-ancestors *;");
  
  // Política de referencia
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Política de características del navegador
  res.setHeader('Feature-Policy', "camera 'none'; microphone 'none'; geolocation 'none'");
  
  // Continuar con la siguiente función middleware
  next();
};