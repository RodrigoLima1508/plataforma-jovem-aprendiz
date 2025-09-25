// src/controllers/missaoController.js - COMPLETO COM LÓGICA MCQ

const Missao = require('../models/Missao');
const User = require('../models/User');

// @desc    Criar uma nova missão
// @route   POST /api/missoes
// @access  Privado
const createMissao = async (req, res) => {
  try {
    const { titulo, descricao, xp, categoria, link, opcoes, respostaCerta } = req.body;

    // A validação agora é para 'opcoes' e 'respostaCerta'
    if (!titulo || !descricao || !xp || !categoria || !opcoes || !respostaCerta) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios, incluindo Opções e Resposta Certa.' });
    }

    const missao = await Missao.create({
      titulo,
      descricao,
      xp,
      categoria,
      link,
      opcoes,
      respostaCerta: respostaCerta.toUpperCase(), // Salva a letra em maiúscula
    });

    res.status(201).json(missao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a missão.', error: error.message });
  }
};

// @desc    Obter todas as missões
// @route   GET /api/missoes
// @access  Privado
const getMissoes = async (req, res) => {
  try {
    const missoes = await Missao.find();
    res.status(200).json(missoes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter as missões.', error: error.message });
  }
};

// @desc    Completar uma missão e dar XP ao usuário
// @route   POST /api/missoes/complete
// @access  Privado
const completeMissao = async (req, res) => {
  try {
    // Agora espera a letra da resposta do usuário
    const { missaoId, respostaUsuario } = req.body; 
    const userId = req.user._id;

    const missao = await Missao.findById(missaoId);
    if (!missao) {
      return res.status(404).json({ message: 'Missão não encontrada.' });
    }

    const user = await User.findById(userId);
    if (user.missoesConcluidas.includes(missaoId)) {
      return res.status(400).json({ message: 'Você já completou esta missão.' });
    }
    
    // NOVO: Validação simples de múltipla escolha
    if (respostaUsuario.toUpperCase() !== missao.respostaCerta.toUpperCase()) {
        return res.status(400).json({ message: 'Resposta incorreta. Por favor, selecione a opção correta.' });
    }

    // Lógica de XP e Nível (se a resposta estiver correta)
    user.xp += missao.xp;
    user.missoesConcluidas.push(missaoId);

    const xpParaProximoNivel = 100 * user.nivel;
    if (user.xp >= xpParaProximoNivel) {
      user.nivel += 1;
    }

    await user.save();

    res.status(200).json({
      message: `Missão concluída! Você ganhou ${missao.xp} XP e agora está no nível ${user.nivel}.`,
      user: {
        nivel: user.nivel,
        xp: user.xp,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao completar a missão.', error: error.message });
  }
};

module.exports = {
  createMissao,
  getMissoes,
  completeMissao,
};