/**
 * Script para la validación del formulario de registro
 */

document.addEventListener('DOMContentLoaded', function() {
  // Referencias a elementos del formulario
  const participantForm = document.getElementById('participant-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const termsCheckbox = document.getElementById('terms');
  
  // Función para validar el formato de email
  function isValidEmail(email) {
    if (!email) return false;
    // Validación más estricta para emails
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 100;
  }
  

  
  // Función para validar el nombre
  function isValidName(name) {
    if (!name) return false;
    // Nombre debe tener al menos 3 caracteres y no contener caracteres especiales excepto espacios y acentos
    const nameRegex = /^[\p{L}\s]{3,50}$/u;
    return nameRegex.test(name);
  }
  
  // Función para mostrar mensaje de error
  function showError(input, message) {
    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.invalid-feedback') || document.createElement('div');
    
    if (!formControl.querySelector('.invalid-feedback')) {
      errorElement.className = 'invalid-feedback';
      formControl.appendChild(errorElement);
    }
    
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    errorElement.textContent = message;
    
    // Añadir animación de shake para mejor feedback visual
    input.classList.add('shake');
    setTimeout(() => {
      input.classList.remove('shake');
    }, 500);
  }
  
  // Función para mostrar éxito
  function showSuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    
    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.invalid-feedback');
    
    if (errorElement) {
      errorElement.textContent = '';
    }
  }
  
  // Función para sanitizar input
  function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '') // Eliminar < y > para prevenir HTML
      .replace(/[\r\n\t]/g, ' ') // Reemplazar saltos de línea y tabs con espacios
      .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno solo
      .trim(); // Eliminar espacios al inicio y final
  }
  
  // Validación en tiempo real para el campo de nombre
  nameInput.addEventListener('blur', function() {
    const sanitizedName = sanitizeInput(nameInput.value);
    nameInput.value = sanitizedName; // Aplicar sanitización
    
    if (sanitizedName === '') {
      showError(nameInput, 'El nombre es obligatorio');
    } else if (!isValidName(sanitizedName)) {
      showError(nameInput, 'El nombre debe tener al menos 3 caracteres y no contener caracteres especiales');
    } else {
      showSuccess(nameInput);
    }
  });
  
  // Validación en tiempo real para el campo de email
  emailInput.addEventListener('blur', function() {
    const sanitizedEmail = sanitizeInput(emailInput.value);
    emailInput.value = sanitizedEmail; // Aplicar sanitización
    
    if (sanitizedEmail === '') {
      showError(emailInput, 'El email es obligatorio');
    } else if (!isValidEmail(sanitizedEmail)) {
      showError(emailInput, 'El formato del email no es válido');
    } else {
      showSuccess(emailInput);
    }
  });
  

  
  // Validación al enviar el formulario
  participantForm.addEventListener('submit', function(event) {
    let isValid = true;
    
    // Sanitizar todos los campos
    const sanitizedName = sanitizeInput(nameInput.value);
    const sanitizedEmail = sanitizeInput(emailInput.value);
    
    // Actualizar valores sanitizados
    nameInput.value = sanitizedName;
    emailInput.value = sanitizedEmail;
    
    // Validar nombre
    if (sanitizedName === '') {
      showError(nameInput, 'El nombre es obligatorio');
      isValid = false;
    } else if (!isValidName(sanitizedName)) {
      showError(nameInput, 'El nombre debe tener al menos 3 caracteres y no contener caracteres especiales');
      isValid = false;
    } else {
      showSuccess(nameInput);
    }
    
    // Validar email
    if (sanitizedEmail === '') {
      showError(emailInput, 'El email es obligatorio');
      isValid = false;
    } else if (!isValidEmail(sanitizedEmail)) {
      showError(emailInput, 'El formato del email no es válido');
      isValid = false;
    } else {
      showSuccess(emailInput);
    }
    

    
    // Validar términos y condiciones
    if (!termsCheckbox.checked) {
      const formCheck = termsCheckbox.parentElement;
      const errorElement = formCheck.querySelector('.invalid-feedback') || document.createElement('div');
      
      if (!formCheck.querySelector('.invalid-feedback')) {
        errorElement.className = 'invalid-feedback d-block';
        formCheck.appendChild(errorElement);
      }
      
      termsCheckbox.className = 'form-check-input is-invalid';
      errorElement.textContent = 'Debes aceptar los términos y condiciones';
      isValid = false;
    } else {
      termsCheckbox.className = 'form-check-input is-valid';
      const formCheck = termsCheckbox.parentElement;
      const errorElement = formCheck.querySelector('.invalid-feedback');
      
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
    
    // Si no es válido, prevenir el envío del formulario
    if (!isValid) {
      event.preventDefault();
    }
  });
});