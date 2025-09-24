/**
 * Script principal para la aplicación de promoción de Monkey Food
 */

document.addEventListener('DOMContentLoaded', async function() {
  // Inicializar animación de intro del logo
  initLogoIntro();
  
  // Referencias a elementos del DOM
  const welcomeCard = document.getElementById('welcome-card');
  const registrationFormCard = document.getElementById('registration-form-card');
  const resultCard = document.getElementById('result-card');
  const errorCard = document.getElementById('error-card');
  const alreadyParticipatedCard = document.getElementById('already-participated-card');
  const participantForm = document.getElementById('participant-form');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const restartBtnNoPrize = document.getElementById('restart-btn-no-prize');
  const restartBtnError = document.getElementById('restart-btn-error');
  const restartBtnAlready = document.getElementById('restart-btn-already');
  const winnerContent = document.getElementById('winner-content');
  const noPrizeContent = document.getElementById('no-prize-content');
  
  // Ya no verificamos participación previa - se permite participar múltiples veces
  // Este bloque se mantiene comentado para referencia
  /*
  try {
    const { hasParticipated } = await checkDeviceParticipation();
    
    if (hasParticipated) {
      hideAllCards();
      alreadyParticipatedCard.classList.remove('d-none');
    }
  } catch (error) {
    console.error('Error al verificar la participación:', error);
  }
  */
  
  // Evento para el botón de inicio
  startBtn.addEventListener('click', function() {
    hideAllCards();
    registrationFormCard.classList.remove('d-none');
  });
  
  // Eventos para los botones de reinicio
  restartBtn.addEventListener('click', function() {
    hideAllCards();
    welcomeCard.classList.remove('d-none');
  });
  
  restartBtnNoPrize.addEventListener('click', function() {
    hideAllCards();
    welcomeCard.classList.remove('d-none');
  });
  
  restartBtnError.addEventListener('click', function() {
    hideAllCards();
    welcomeCard.classList.remove('d-none');
  });
  
  restartBtnAlready.addEventListener('click', function() {
    hideAllCards();
    welcomeCard.classList.remove('d-none');
  });
  
  // Evento para el envío del formulario
  participantForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Obtener los datos del formulario
    const formData = new FormData(participantForm);
    const name = formData.get('name');
    const email = formData.get('email');

    const deviceId = getDeviceId();
    
    // Validar los datos del formulario
    if (!name || !email) {
      showError('Por favor, completa todos los campos del formulario.');
      return;
    }
    
    try {
      // Enviar los datos al servidor
      const response = await fetch('/api/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          deviceId
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar la participación');
      }
      
      // Mostrar el resultado
      showResult(data.data);
    } catch (error) {
      console.error('Error al procesar la participación:', error);
      showError(error.message || 'Error al procesar la participación');
    }
  });
  
  // Función para ocultar todas las tarjetas
  function hideAllCards() {
    welcomeCard.classList.add('d-none');
    registrationFormCard.classList.add('d-none');
    resultCard.classList.add('d-none');
    errorCard.classList.add('d-none');
    alreadyParticipatedCard.classList.add('d-none');
  }
  
  // Función para mostrar un error
  function showError(message) {
    hideAllCards();
    errorCard.querySelector('.error-message').textContent = message;
    errorCard.classList.remove('d-none');
  }
  
  // Función para mostrar el resultado
  function showResult(data) {
    hideAllCards();
    
    const { participant, prize } = data;
    
    // Limpiar el formulario
    participantForm.reset();
    
    // Mostrar el contenido correspondiente según si ha ganado o no
    if (participant.hasWon) {
      winnerContent.classList.remove('d-none');
      noPrizeContent.classList.add('d-none');
      
      // Iniciar animación de confeti si está disponible
      if (typeof startConfetti === 'function') {
        setTimeout(() => startConfetti(), 500);
      }
      
      // Mostrar el nombre del premio
      const prizeName = resultCard.querySelector('.prize-name');
      prizeName.textContent = prize.name;
      
      // Mostrar la descripción del premio
      const prizeDescription = resultCard.querySelector('.prize-description');
      if (prize.description) {
        prizeDescription.textContent = prize.description;
      } else {
        prizeDescription.textContent = '¡Un delicioso premio de Monkey Food!';
      }
      
      // Mostrar el código del premio recibido del servidor
      const prizeCode = resultCard.querySelector('.prize-code');
      // Si el servidor envió un código, usarlo; de lo contrario, generarlo localmente
      if (participant.prizeCode) {
        prizeCode.textContent = participant.prizeCode;
      } else {
        prizeCode.textContent = generatePrizeCode(participant._id, prize._id);
      }
    } else {
      winnerContent.classList.add('d-none');
      noPrizeContent.classList.remove('d-none');
    }
    
    resultCard.classList.remove('d-none');
  }
  
  // Función para generar un código de premio
  function generatePrizeCode(participantId, prizeId) {
    // Tomar los primeros 4 caracteres del ID del participante y los últimos 4 del premio
    const prefix = participantId.substring(0, 4).toUpperCase();
    const suffix = prizeId.substring(prizeId.length - 4).toUpperCase();
    
    // Generar 4 caracteres aleatorios
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    // Combinar todo para formar el código
    return `${prefix}-${randomChars}-${suffix}`;
  }
  
  // Función para inicializar la animación de intro del logo
  function initLogoIntro() {
    const logoOverlay = document.getElementById('logo-intro-overlay');
    const mainContent = document.getElementById('main-content');
    
    // Mostrar la animación de intro durante 3.5 segundos
    setTimeout(() => {
      // Iniciar fade-out del logo
      logoOverlay.classList.add('fade-out');
      
      // Mostrar el contenido principal
      setTimeout(() => {
        mainContent.classList.add('show');
        // Remover completamente el overlay después del fade-out
        setTimeout(() => {
          logoOverlay.style.display = 'none';
        }, 800);
      }, 200);
    }, 3500);
  }
});