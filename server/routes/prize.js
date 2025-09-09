const express = require('express');
const router = express.Router();
const { 
  getPrizes, 
  updatePrize, 
  resetPrizes,
  getPrizeStats
} = require('../controllers/prizeController');

// Rutas para premios
router.get('/', getPrizes);
router.get('/stats', getPrizeStats);
router.put('/:id', updatePrize);
router.post('/reset', resetPrizes);

module.exports = router;