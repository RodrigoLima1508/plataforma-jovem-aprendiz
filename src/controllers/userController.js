// src/controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função auxiliar para gerar o token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // O token expira em 30 dias
  });
};

// @desc    Registrar um novo usuário
// @route   POST /api/users/register
// @access  Público
const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'Usuário com este e-mail já existe.' });
  }

  const salt = await bcrypt.genSalt(10);
  const senhaHash = await bcrypt.hash(senha, salt);

  const user = await User.create({
    nome,
    email,
    senha: senhaHash,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      nome: user.nome,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Dados do usuário inválidos.' });
  }
};

// @desc    Autenticar (logar) um usuário
// @route   POST /api/users/login
// @access  Público
const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(senha, user.senha))) {
    res.json({
      _id: user.id,
      nome: user.nome,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  }
};

// @desc    Obter dados do perfil do usuário
// @route   GET /api/users/profile
// @access  Privado
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      nome: user.nome,
      email: user.email,
      nivel: user.nivel,
      xp: user.xp,
      conquistas: user.conquistas,
      trilhasConcluidas: user.trilhasConcluidas,
      missoesConcluidas: user.missoesConcluidas,
    });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};