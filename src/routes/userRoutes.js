// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController'); // Importe a nova função
const { protect } = require('../middlewares/authMiddleware'); // Importe o middleware

// Rota de registro (POST)
router.post('/register', registerUser);

// Rota de login (POST)
router.post('/login', loginUser);

// Rota protegida de perfil (GET)
router.get('/profile', protect, getUserProfile); // Adicione a rota, com o middleware 'protect' no meio

module.exports = router;