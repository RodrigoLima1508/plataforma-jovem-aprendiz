// src/models/Trilha.js

const mongoose = require('mongoose');

const trilhaSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  missoes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Missao', // Esta é a chave. Referencia o modelo de Missão
  }],
}, {
  timestamps: true,
});

const Trilha = mongoose.model('Trilha', trilhaSchema);

module.exports = Trilha;