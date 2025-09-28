// src/controllers/rankingController.js - CÓDIGO FINAL E CORRETO

const User = require('../models/User');

// @desc    Obter o ranking global de usuários por XP
// @route   GET /api/ranking/global
// @access  Privado (requer login)
const getGlobalRanking = async (req, res) => {
  try {
    // Lógica principal: Busca todos, ordena por 'xp' (descendente) e limita.
    const ranking = await User.find()
      .select('nome nivel xp email') // Selecionamos os campos que o frontend precisa
      .sort({ xp: -1 })      // ORDENA DO MAIOR XP PARA O MENOR
      .limit(10);             // Limita aos 10 primeiros

    res.status(200).json(ranking);
  } catch (error) {
    console.error("RANKING ERROR:", error);
    res.status(500).json({ message: 'Erro interno ao buscar o ranking.' });
  }
};

module.exports = {
  getGlobalRanking,
};