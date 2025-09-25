// src/controllers/curriculoController.js

const User = require('../models/User'); // Para salvar os dados no perfil

// @desc    Gera o currículo a partir dos dados do usuário
// @route   POST /api/curriculo/generate
// @access  Privado (requer login)
const generateCurriculo = async (req, res) => {
  const userId = req.user._id; // ID do usuário logado
  const dadosCurriculo = req.body; 

  try {
    // 1. Lógica de salvar os dados no perfil do usuário
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Salvamos os dados recebidos no campo 'curriculo' do modelo User
    user.curriculo = dadosCurriculo;
    await user.save();

    // 2. Simulação da geração de PDF (a lógica real viria aqui)
    // Se fosse um sistema real, você usaria uma biblioteca (como pdfkit) aqui.
    
    // Retorna uma mensagem de sucesso, confirmando que os dados foram salvos
    res.status(200).json({
      message: 'Dados do currículo salvos com sucesso! (PDF simulado).',
      savedData: dadosCurriculo
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar o currículo.', error: error.message });
  }
};

module.exports = {
  generateCurriculo,
};