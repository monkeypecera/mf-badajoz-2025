const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce un email válido']
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  deviceId: {
    type: String,
    required: [true, 'El ID del dispositivo es obligatorio'],
    index: true
  },
  prize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prize',
    required: true
  },
  hasWon: {
    type: Boolean,
    default: false
  },
  prizeCode: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Índice compuesto para evitar participaciones duplicadas por dispositivo
ParticipantSchema.index({ deviceId: 1 }, { unique: true });

module.exports = mongoose.model('Participant', ParticipantSchema);