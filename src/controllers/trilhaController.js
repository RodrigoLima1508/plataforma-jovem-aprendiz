// src/controllers/trilhaController.js

const Trilha = require('../models/Trilha');

// @desc    Criar uma nova trilha
// @route   POST /api/trilhas
// @access  Privado (apenas para usuários logados)
const createTrilha = async (req, res) => {
  try {
    const { nome, descricao, missoes } = req.body;

    if (!nome || !descricao) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    const trilha = await Trilha.create({
      nome,
      descricao,
      missoes,
    });

    res.status(201).json(trilha);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a trilha.', error: error.message });
  }
};

// @desc    Obter todas as trilhas
// @route   GET /api/trilhas
// @access  Privado (apenas para usuários logados)
const getTrilhas = async (req, res) => {
  try {
    const trilhas = await Trilha.find().populate('missoes');
    res.status(200).json(trilhas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter as trilhas.', error: error.message });
  }
};

module.exports = {
  createTrilha,
  getTrilhas,
};