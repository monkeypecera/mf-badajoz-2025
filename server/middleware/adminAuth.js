/**
 * Middleware para proteger rutas de administración
 * Utiliza autenticación básica para simplificar el proceso
 */

const adminAuth = (req, res, next) => {
  // Obtener credenciales de las variables de entorno
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Pecera@2025!';
  
  // Obtener encabezado de autorización
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'Acceso no autorizado'
    });
  }
  
  // Verificar que sea autenticación básica
  const auth = authHeader.split(' ')[0];
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const username = credentials[0];
  const password = credentials[1];
  
  if (auth !== 'Basic' || username !== adminUser || password !== adminPassword) {
    return res.status(401).json({
      success: false,
      error: 'Credenciales inválidas'
    });
  }
  
  // Si las credenciales son correctas, continuar
  next();
};

module.exports = adminAuth;