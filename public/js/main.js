/**
 * Script principal para la aplicación de promoción de Monkey Food
 */

document.addEventListener('DOMContentLoaded', async function() {
  // Referencias a elementos del DOM
  const loadingScreen = document.getElementById('loading-screen');
  const mainContainer = document.getElementById('main-container');
  const participationForm = document.getElementById('participation-form');
  const submitBtn = document.getElementById('submit-btn');
  const resultMessage = document.getElementById('result-message');
  
  // Simular tiempo de carga y luego mostrar el contenido principal
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
    if (mainContainer) {
      mainContainer.style.display = 'block';
    }
  }, 2000); // 2 segundos de pantalla de carga
  
  // Verificar si el dispositivo ya ha participado
  try {
    const deviceId = getDeviceId();
    const response = await fetch(`/api/participants/check/${deviceId}`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.hasParticipated) {
        showMessage('Ya has participado en este concurso desde este dispositivo. ¡Gracias por participar!', 'info');
        disableForm();
      }
    }
  } catch (error) {
    console.log('No se pudo verificar la participación previa, continuando...');
  }
  
  // Evento para el envío del formulario
  if (participationForm) {
    participationForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      // Obtener los datos del formulario
      const formData = new FormData(participationForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const terms = formData.get('terms');
      
      // Validar los datos del formulario
      if (!name || !email || !terms) {
        showMessage('Por favor, completa todos los campos obligatorios y acepta los términos.', 'error');
        return;
      }
      
      // Validar email
      if (!isValidEmail(email)) {
        showMessage('Por favor, introduce un email válido.', 'error');
        return;
      }
      
      const deviceId = getDeviceId();
      
      // Mostrar estado de carga
      setLoadingState(true);
      
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
            phone,
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
        showMessage(error.message || 'Error al procesar la participación. Inténtalo de nuevo.', 'error');
      } finally {
        setLoadingState(false);
      }
    });
  }
  
  // Función para mostrar mensajes
  function showMessage(message, type = 'info') {
    if (!resultMessage) return;
    
    resultMessage.innerHTML = `
      <div class="alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'}">
        ${message}
      </div>
    `;
    resultMessage.style.display = 'block';
    
    // Scroll al mensaje
    resultMessage.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Función para mostrar el resultado
  function showResult(data) {
    const { participant, prize } = data;
    
    if (participant.hasWon && prize) {
      // Iniciar animación de confeti si está disponible
      if (typeof startConfetti === 'function') {
        setTimeout(() => startConfetti(), 500);
      }
      
      showMessage(`
        <div class="text-center">
          <h3 class="text-success mb-3">🎉 ¡FELICIDADES! 🎉</h3>
          <p class="mb-2"><strong>Has ganado:</strong> ${prize.name}</p>
          ${prize.description ? `<p class="mb-2">${prize.description}</p>` : ''}
          ${participant.prizeCode ? `<p class="mb-2"><strong>Código del premio:</strong> <code>${participant.prizeCode}</code></p>` : ''}
          <p class="text-muted">Recibirás un email con los detalles de tu premio.</p>
          <a href="https://monkey-food.es" class="btn btn-primary mt-3">Visitar Monkey Food</a>
        </div>
      `, 'success');
    } else {
      showMessage(`
        <div class="text-center">
          <h3 class="mb-3">😔 Esta vez no ha habido suerte</h3>
          <p class="mb-2">¡Pero no te preocupes! Sigue visitando Monkey Food para más oportunidades.</p>
          <a href="https://monkey-food.es" class="btn btn-primary mt-3">Visitar Monkey Food</a>
        </div>
      `, 'info');
    }
    
    // Deshabilitar el formulario después de participar
    disableForm();
  }
  
  // Función para deshabilitar el formulario
  function disableForm() {
    if (participationForm) {
      const inputs = participationForm.querySelectorAll('input, button');
      inputs.forEach(input => {
        input.disabled = true;
      });
    }
  }
  
  // Función para establecer el estado de carga
  function setLoadingState(loading) {
    if (!submitBtn) return;
    
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (loading) {
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline-block';
      submitBtn.disabled = true;
    } else {
      if (btnText) btnText.style.display = 'inline-block';
      if (btnLoading) btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  }
  
  // Función para validar email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});

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