/**
 * Middleware para configurar cabeceras de seguridad HTTP
 */

// Middleware para configurar cabeceras de seguridad
exports.setSecurityHeaders = (req, res, next) => {
  // Protección contra XSS (Cross-Site Scripting)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Evitar que el navegador detecte automáticamente el tipo MIME
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Remover explícitamente X-Frame-Options para permitir iframe embedding
  res.removeHeader('X-Frame-Options');
  
  // Configuración completa de CSP para permitir iframe embedding
  const cspPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://kit.fontawesome.com https://cdnjs.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com",
    "connect-src 'self'",
    "frame-ancestors *",
    "frame-src *"
  ].join('; ');
  
  res.setHeader('Content-Security-Policy', cspPolicy);
  
  // Headers adicionales para asegurar compatibilidad con iframe
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Política de referencia
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Política de características del navegador
  res.setHeader('Feature-Policy', "camera 'none'; microphone 'none'; geolocation 'none'");
  
  // Continuar con la siguiente función middleware
  next();
};