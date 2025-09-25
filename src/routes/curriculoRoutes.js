// src/routes/curriculoRoutes.js

const express = require('express');
const router = express.Router();
const { generateCurriculo } = require('../controllers/curriculoController');
const { protect } = require('../middlewares/authMiddleware');

// Rota protegida para geração/salvamento do currículo
router.post('/generate', protect, generateCurriculo);

module.exports = router;