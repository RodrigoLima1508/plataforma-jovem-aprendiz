// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário
import { useAuth } from '../context/AuthContext'; // Importe o nosso hook de autenticação

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // Para controle de estado de loading/botão
  const [error, setError] = useState(''); // Para exibir erros da API
  
  const { login } = useAuth(); // Acessamos a função login do contexto
  const navigate = useNavigate(); // Inicializa a função de navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores
    setLoading(true); // Ativa o loading
    
    // Chama a função login que está no AuthContext
    const success = await login(email, senha);

    if (success) {
      // Se a API retornar sucesso (token), redireciona para a dashboard
      navigate('/dashboard'); 
    } else {
      // Se falhar, exibe uma mensagem de erro (que vem da API)
      setError('Login falhou. Verifique seu e-mail e senha.');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#f0f0f0', 
        color: '#333' 
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
        Acesso do Jovem Aprendiz
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        minWidth: '350px' 
      }}>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }} 
              required
              disabled={loading}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="senha" style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
            <input 
              type="password" 
              id="senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }} 
              required
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '10px', backgroundColor: loading ? '#6c757d' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '14px' }}>
          Não tem conta? <a href="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;