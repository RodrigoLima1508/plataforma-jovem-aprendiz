// server.js - CÓDIGO FINAL COM CONFIGURAÇÃO ROBUSTA DE CORS

// 1. Importa as bibliotecas e módulos necessários
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const missaoRoutes = require('./src/routes/missaoRoutes');
const trilhaRoutes = require('./src/routes/trilhaRoutes');
const curriculoRoutes = require('./src/routes/curriculoRoutes');
const cors = require('cors'); 

// 2. Carrega as variáveis de ambiente
dotenv.config();

// 3. Conecta ao banco de dados MongoDB
connectDB();

// 4. Inicia o aplicativo Express
const app = express();

// --- NOVA CONFIGURAÇÃO CORS ROBUSTA ---
const allowedOrigins = [
  'https://jovem-aprendiz-api.onrender.com', // Sua própria API (para referência interna)
  'https://plataforma-jovem-aprendiz.netlify.app' // <<-- Mude este placeholder para o seu domínio real do Netlify
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem 'origin' (como apps móveis ou o mesmo domínio)
    if (!origin) return callback(null, true);
    
    // Verifica se a origem está na lista permitida ou se é um subdomínio do Render (para segurança extra)
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.onrender.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Permite que o token seja enviado
};

// 5. Configura os middlewares essenciais (CORS e JSON)
app.use(express.json());
app.use(cors(corsOptions)); // <--- APLICA A CONFIGURAÇÃO ROBUSTA

// 6. Define a rota principal para teste
app.get('/', (req, res) => {
  res.send('API da Plataforma Jovem Aprendiz rodando!');
});

// 7. Conecta as rotas da API
app.use('/api/users', userRoutes);
app.use('/api/missoes', missaoRoutes);
app.use('/api/trilhas', trilhaRoutes);
app.use('/api/curriculo', curriculoRoutes);

// 8. Define a porta e inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});