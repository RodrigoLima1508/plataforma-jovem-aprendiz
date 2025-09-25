// src/routes/missaoRoutes.js

const express = require('express');
const router = express.Router();
const { createMissao, getMissoes, completeMissao } = require('../controllers/missaoController');
const { protect } = require('../middlewares/authMiddleware');

// Rotas para criar e obter missões
router.route('/')
  .post(protect, createMissao)
  .get(protect, getMissoes);

// Rota para completar uma missão
router.post('/complete', protect, completeMissao);

module.exports = router;