// src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Verifica se o token existe no cabeçalho da requisição
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Obtém o token do cabeçalho
      token = req.headers.authorization.split(' ')[1];

      // 3. Verifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Encontra o usuário pelo ID do token e anexa ao objeto da requisição
      req.user = await User.findById(decoded.id).select('-senha'); // Exclui a senha

      // 5. Prossegue para a próxima função (a rota)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Não autorizado, token falhou.' });
    }
  }

  // 6. Se não houver token, retorna erro
  if (!token) {
    res.status(401).json({ message: 'Não autorizado, nenhum token.' });
  }
};

module.exports = { protect };