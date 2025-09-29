// src/models/Missao.js - ATUALIZADO PARA MÚLTIPLA ESCOLHA

const mongoose = require('mongoose');

const missaoSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
    enum: ['TI', 'Obras', 'Suprimentos', 'RH', 'Outro','Administrativo'],
  },
  link: {
    type: String,
  },
  // NOVOS CAMPOS PARA QUIZ DE MÚLTIPLA ESCOLHA
  opcoes: [{ // Array de strings para as opções
    type: String,
    required: true,
  }],
  respostaCerta: { // A letra ou índice da resposta correta (Ex: "B" ou "A")
    type: String,
    required: true,
  },
  trilhaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trilha',
  },
}, {
  timestamps: true,
});

const Missao = mongoose.model('Missao', missaoSchema);

module.exports = Missao;