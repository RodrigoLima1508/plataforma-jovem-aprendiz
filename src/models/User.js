const mongoose = require('mongoose');

// Define o schema (a planta) do nosso modelo de usuário
const userSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true, // O nome é obrigatório
  },
  email: {
    type: String,
    required: true,
    unique: true, // O e-mail deve ser único (não pode haver 2 usuários com o mesmo e-mail)
  },
  senha: {
    type: String,
    required: true,
  },
  nivel: {
    type: Number,
    default: 1, // Valor inicial: todo novo usuário começa no nível 1
  },
  xp: {
    type: Number,
    default: 0, // Valor inicial: todo novo usuário começa com 0 XP
  },
  conquistas: [{
    type: String, // Um array de strings para os IDs das conquistas
  }],
  trilhasConcluidas: [{
    type: String, // Um array de strings para os IDs das trilhas concluídas
  }],
  missoesConcluidas: [{
    type: String, // Um array de strings para os IDs das missões concluídas
  }],
}, {
  timestamps: true, // Adiciona campos `createdAt` e `updatedAt` automaticamente
});

// Cria o modelo a partir do schema
const User = mongoose.model('User', userSchema);

module.exports = User;