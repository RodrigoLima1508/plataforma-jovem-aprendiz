// frontend/src/pages/RankingPage.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/axios'; // Usa a instância configurada
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RankingPage = () => {
    const { token, logout } = useAuth();
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRanking = async () => {
            if (!token) {
                logout(); // Garante que apenas usuários logados vejam o Ranking
                return;
            }

            try {
                // Rota da API que deve retornar todos os usuários
                // O back-end deve ordenar por XP em ordem decrescente (do maior para o menor)
                const response = await api.get('/api/users'); 
                
                // Filtra e Ordena (caso o back-end não tenha feito a ordenação)
                const sortedUsers = response.data
                    .sort((a, b) => b.xp - a.xp); // Ordena por XP decrescente
                
                setRanking(sortedUsers);
            } catch (err) {
                console.error("Erro ao buscar ranking:", err);
                if (err.response && err.response.status === 401) {
                    logout();
                }
                setError('Falha ao carregar o Ranking. Verifique o status da API.');
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, [token, logout]);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>Carregando Ranking...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Erro: {error}</div>;
    }

    // Função para renderizar o ícone do pódio
    const renderRankIcon = (index) => {
        if (index === 0) return <span style={{ fontSize: '30px', color: '#ffd700' }}>🥇</span>; // Ouro
        if (index === 1) return <span style={{ fontSize: '30px', color: '#c0c0c0' }}>🥈</span>; // Prata
        if (index === 2) return <span style={{ fontSize: '30px', color: '#cd7f32' }}>🥉</span>; // Bronze
        return <span style={{ fontSize: '20px', color: '#6c757d', fontWeight: 'bold' }}>#{index + 1}</span>;
    };

    return (
        <div className="p-8" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
            <div className="max-w-3xl mx-auto">
                <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
                    &larr; Voltar para Dashboard
                </Link>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center', color: '#1a1a1a' }}>
                    Ranking Global de Aprendizes
                </h1>

                <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                    {ranking.map((user, index) => (
                        <div 
                            key={user._id} 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                padding: '15px 25px', 
                                borderBottom: index < ranking.length - 1 ? '1px solid #eee' : 'none',
                                backgroundColor: index === 0 ? '#fffbe6' : 'white', // Destaque para o 1º lugar
                                borderRadius: index === 0 ? '12px 12px 0 0' : '0'
                            }}
                        >
                            {/* Posição */}
                            <div style={{ flex: '0 0 50px', textAlign: 'center' }}>
                                {renderRankIcon(index)}
                            </div>

                            {/* Nome e Email */}
                            <div style={{ flex: 1, marginLeft: '15px' }}>
                                <p style={{ fontSize: '18px', fontWeight: '600', color: '#007bff' }}>{user.nome}</p>
                                <p style={{ fontSize: '12px', color: '#6c757d' }}>{user.email}</p>
                            </div>

                            {/* Nível e XP */}
                            <div style={{ textAlign: 'right', flex: '0 0 100px' }}>
                                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#28a745' }}>Nível {user.nivel || 1}</p>
                                <p style={{ fontSize: '14px', color: '#ffc107' }}>{user.xp} XP</p>
                            </div>
                        </div>
                    ))}
                </div>

                {ranking.length === 0 && (
                    <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '16px', color: '#6c757d' }}>
                        Nenhum usuário encontrado no Ranking.
                    </p>
                )}
            </div>
        </div>
    );
};

export default RankingPage;