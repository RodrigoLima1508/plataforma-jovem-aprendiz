// frontend/src/pages/DashboardPage.jsx - CÓDIGO FINAL E LIMPO

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const DashboardPage = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(!user);
  const [missoesSugeridas, setMissoesSugeridas] = useState([]);
  const [trilhasAtivas, setTrilhasAtivas] = useState([]);

  // --- Estilos Base ---
  const baseCardStyle = {
    backgroundColor: 'white', 
    padding: '20px', 
    borderRadius: '8px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    color: '#333'
  };
  const responsiveCardStyle = { 
    flex: '1 1 300px', 
    minWidth: '300px'
  };

  // Efeito principal para buscar Perfil, Missões e Trilhas
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    const token = localStorage.getItem('token'); 
    if (!token) return logout();

    const fetchData = async () => {
      setLoading(true);
      try {
        const apiBaseUrl = API_URL.replace('/users', '');

        // 1. Buscar Perfil 
        const profileResponse = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(profileResponse.data);

        // 2. Buscar Missões e Trilhas
        const missoesResponse = await axios.get(`${apiBaseUrl}/missoes`, { headers: { Authorization: `Bearer ${token}` } });
        const trilhasResponse = await axios.get(`${apiBaseUrl}/trilhas`, { headers: { Authorization: `Bearer ${token}` } });
        
        // Filtra missões não concluídas
        const sugeridas = missoesResponse.data.filter(
            m => !profileResponse.data.missoesConcluidas.includes(m._id)
        ).slice(0, 3); 
        
        setMissoesSugeridas(sugeridas);
        setTrilhasAtivas(trilhasResponse.data.slice(0, 2));

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        logout(); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, logout]);

  if (loading || !profile) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>Carregando Dashboard...</div>;
  }
  
  // Lógica de XP
  const xpNecessario = 100 * profile.nivel;
  const progresso = (profile.xp / xpNecessario) * 100;
  const missoesCount = profile.missoesConcluidas?.length || 0;
  const proximoNivelXP = xpNecessario - profile.xp;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '40px 20px', color: '#333' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header Dinâmico */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>Olá, {profile.nome}!</h1>
        </header>

        {/* Cartão Principal: Nível e Progresso */}
        <div style={{ ...baseCardStyle, borderTop: '5px solid #007bff', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                    {/* Ícone de Perfil */}
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#e0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007bff' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#6c757d' }}>Nível Atual</span>
                        <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#007bff' }}>
                            {profile.nivel}
                        </p>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#6c757d' }}>Total de Missões</span>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>{missoesCount}</p>
                </div>
            </div>
            
            {/* Barra de Progresso */}
            <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6c757d', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>XP: {profile.xp} / {xpNecessario}</span>
                    <span style={{ fontWeight: '500' }}>{progresso.toFixed(0)}%</span>
                </div>
                <div style={{ width: '100%', backgroundColor: '#e9ecef', borderRadius: '5px', height: '10px' }}>
                    <div style={{ backgroundColor: '#007bff', height: '10px', borderRadius: '5px', width: `${progresso > 100 ? 100 : progresso}%` }}></div>
                </div>
                <p style={{ fontSize: '12px', color: '#6c757d', textAlign: 'right', marginTop: '5px' }}>
                    Faltam {proximoNivelXP} XP para o próximo nível!
                </p>
            </div>
        </div>

        {/* Seções Principais (Layout Responsivo) */}
        <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '20px',
            justifyContent: 'flex-start'
        }}>
            
            {/* Card de Missões Sugeridas - DINÂMICO */}
            <div style={{ ...baseCardStyle, ...responsiveCardStyle, borderLeft: '5px solid #ffc107' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Próximas Missões</h2>
                {missoesSugeridas.length === 0 ? (
                    <p style={{ color: '#6c757d' }}>Parabéns! Você concluiu todas as missões disponíveis.</p>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {missoesSugeridas.map(missao => (
                            <li key={missao._id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#333', fontWeight: '500' }}>{missao.titulo}</span>
                                <Link to={`/missions/${missao._id}`} style={{ fontSize: '14px', fontWeight: 'bold', color: '#007bff', textDecoration: 'none' }}>
                                    +{missao.xp} XP &rarr;
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Card de Trilhas em Andamento - DINÂMICO */}
            <div style={{ ...baseCardStyle, ...responsiveCardStyle, borderLeft: '5px solid #28a745' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Trilhas em Andamento</h2>
                {trilhasAtivas.length === 0 ? (
                    <p style={{ color: '#6c757d' }}>Nenhuma trilha ativa. Comece uma agora!</p>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {trilhasAtivas.map(trilha => (
                            <li key={trilha._id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                                <Link to="/trilhas" style={{ color: '#007bff', fontWeight: '500', textDecoration: 'none' }}>
                                    {trilha.nome}
                                </Link>
                                <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '2px' }}>{trilha.missoes.length} Missões</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Card de Conquistas/Badges */}
            <div style={{ ...baseCardStyle, width: '100%', borderLeft: '5px solid #6c757d' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Conquistas Recentes</h2>
                <div style={{ display: 'flex', gap: '30px', fontSize: '30px' }}>
                    <span style={{ color: '#ffc107' }} title="Primeira Missão Concluída">🏆</span>
                    <span style={{ color: '#007bff' }} title="Nível 1 Atingido">🏅</span>
                    <span style={{ color: '#ccc', opacity: 0.8 }} title="Próxima Conquista: Nível 5">🎯</span>
                </div>
            </div>

        </div>

        {/* Rodapé */}
        <footer style={{ textAlign: 'center', color: '#6c757d', fontSize: '12px', marginTop: '40px' }}>
            <p>&copy; 2025 Plataforma Jovem Aprendiz. Design Profissional e Responsivo.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardPage;