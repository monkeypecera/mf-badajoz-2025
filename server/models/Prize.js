const mongoose = require('mongoose');

const PrizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del premio es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'La cantidad de premios es obligatoria'],
    min: [0, 'La cantidad no puede ser negativa']
  },
  initialQuantity: {
    type: Number,
    required: [true, 'La cantidad inicial de premios es obligatoria']
  },
  probability: {
    type: Number,
    required: [true, 'La probabilidad es obligatoria'],
    min: [0, 'La probabilidad no puede ser negativa'],
    max: [1, 'La probabilidad no puede ser mayor que 1']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prize', PrizeSchema);