document.addEventListener('DOMContentLoaded', function() {
  // Referencias a elementos del DOM
  const messagesContainer = document.getElementById('messages');
  const totalPrizesElement = document.getElementById('totalPrizes');
  const distributedPrizesElement = document.getElementById('distributedPrizes');
  const remainingPrizesElement = document.getElementById('remainingPrizes');
  const distributionPercentageElement = document.getElementById('distributionPercentage');
  const prizeTableBody = document.getElementById('prizeTableBody');
  const participantsContainer = document.getElementById('participantsContainer');
  const refreshStatsButton = document.getElementById('refreshStats');
  const resetPrizesButton = document.getElementById('resetPrizes');
  
  // Cargar datos iniciales
  loadPrizeStats();
  loadParticipants();
  
  // Event listeners
  refreshStatsButton.addEventListener('click', function() {
    loadPrizeStats();
    loadParticipants();
    showMessage('Datos actualizados correctamente', 'success');
  });
  
  resetPrizesButton.addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas restablecer todos los premios a sus cantidades iniciales? Esta acción no se puede deshacer.')) {
      resetPrizes();
    }
  });
  
  // Función para cargar estadísticas de premios
  function loadPrizeStats() {
    fetch('/api/prizes/stats')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar estadísticas de premios');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          updatePrizeStats(data.data);
        } else {
          throw new Error(data.error || 'Error desconocido');
        }
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  }
  
  // Función para cargar participantes
  function loadParticipants() {
    fetch('/api/participants')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar participantes');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          updateParticipantsTable(data.participants);
        } else {
          throw new Error(data.error || 'Error desconocido');
        }
      })
      .catch(error => {
        showMessage(error.message, 'error');
        participantsContainer.innerHTML = `<p>Error al cargar participantes: ${error.message}</p>`;
      });
  }
  
  // Función para restablecer premios
  function resetPrizes() {
    fetch('/api/prizes/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al restablecer premios');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          showMessage('Premios restablecidos correctamente', 'success');
          loadPrizeStats(); // Recargar estadísticas
        } else {
          throw new Error(data.error || 'Error desconocido');
        }
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  }
  
  // Función para actualizar estadísticas de premios en la UI
  function updatePrizeStats(data) {
    // Actualizar resumen
    const summary = data.summary;
    totalPrizesElement.textContent = summary.totalInitial;
    distributedPrizesElement.textContent = summary.totalDistributed;
    remainingPrizesElement.textContent = summary.totalRemaining;
    distributionPercentageElement.textContent = summary.globalDistributionPercentage;
    
    // Actualizar tabla de premios
    prizeTableBody.innerHTML = '';
    
    data.prizes.forEach(prize => {
      const row = document.createElement('tr');
      
      // Calcular porcentaje para la barra de progreso
      const progressPercentage = parseFloat(prize.distributionPercentage);
      
      row.innerHTML = `
        <td>${prize.name}</td>
        <td>${prize.initialQuantity}</td>
        <td>${prize.remaining}</td>
        <td>${prize.distributed}</td>
        <td>${prize.probability}</td>
        <td>
          <div>${prize.distributionPercentage}</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
          </div>
        </td>
      `;
      
      prizeTableBody.appendChild(row);
    });
  }
  
  // Función para actualizar tabla de participantes
  function updateParticipantsTable(participants) {
    if (!participants || participants.length === 0) {
      participantsContainer.innerHTML = '<p>No hay participantes registrados.</p>';
      return;
    }
    
    let html = `
      <table class="prize-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Premio</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    participants.forEach(participant => {
      const date = new Date(participant.createdAt).toLocaleString('es-ES');
      const prizeName = participant.prize ? participant.prize.name : 'Ninguno';
      
      html += `
        <tr>
          <td>${participant.name}</td>
          <td>${participant.email}</td>
          <td>${participant.phone}</td>
          <td>${prizeName}</td>
          <td>${date}</td>
        </tr>
      `;
    });
    
    html += '</tbody></table>';
    participantsContainer.innerHTML = html;
  }
  
  // Función para mostrar mensajes
  function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = type === 'error' ? 'error-message' : 'success-message';
    messageElement.textContent = message;
    
    messagesContainer.innerHTML = '';
    messagesContainer.appendChild(messageElement);
    
    // Auto-eliminar mensaje después de 5 segundos
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
});