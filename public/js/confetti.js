/**
 * Confetti animation for prize winners
 */

function startConfetti() {
  const confettiSettings = {
    target: 'confetti-canvas',
    max: 150,
    size: 1.5,
    animate: true,
    props: ['circle', 'square', 'triangle', 'line'],
    colors: [[255, 107, 0], [255, 193, 7], [76, 175, 80], [33, 150, 243], [156, 39, 176]],
    clock: 25,
    rotate: true,
    start_from_edge: true,
    respawn: true
  };
  
  // Create canvas element for confetti
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1000';
  document.body.appendChild(canvas);
  
  // Initialize confetti
  const confetti = window.confetti.create(canvas, confettiSettings);
  confetti.start();
  
  // Stop confetti after 5 seconds
  setTimeout(() => {
    confetti.stop();
    // Remove canvas after animation completes
    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 2000);
  }, 5000);
}

// Add confetti.js library
document.addEventListener('DOMContentLoaded', function() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
  document.head.appendChild(script);
});