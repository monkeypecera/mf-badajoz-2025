/**
 * Protección contra CSRF (Cross-Site Request Forgery)
 */

document.addEventListener('DOMContentLoaded', function() {
  // Generar un token CSRF único para esta sesión
  function generateCSRFToken() {
    // Crear un array de bytes aleatorios
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    
    // Convertir a string hexadecimal
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  
  // Obtener o crear un token CSRF
  function getCSRFToken() {
    let token = sessionStorage.getItem('csrf_token');
    
    if (!token) {
      token = generateCSRFToken();
      sessionStorage.setItem('csrf_token', token);
    }
    
    return token;
  }
  
  // Añadir el token CSRF a todas las solicitudes fetch
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    // Asegurarse de que options.headers existe
    options.headers = options.headers || {};
    
    // Añadir el token CSRF a los headers
    options.headers['X-CSRF-Token'] = getCSRFToken();
    
    // Llamar a la función fetch original
    return originalFetch(url, options);
  };
  
  // Añadir el token CSRF a todos los formularios
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Verificar si el formulario ya tiene un campo CSRF
    if (!form.querySelector('input[name="csrf_token"]')) {
      const csrfInput = document.createElement('input');
      csrfInput.type = 'hidden';
      csrfInput.name = 'csrf_token';
      csrfInput.value = getCSRFToken();
      form.appendChild(csrfInput);
    }
  });
});