// frontend/src/pages/RankingPage.jsx - CÓDIGO FINAL E LIMPO

import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; // Adicionamos useNavigate

const RankingPage = () => {
    const { token, logout } = useAuth();
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRanking = async () => {
            if (!token) {
                logout(); 
                return;
            }

            try {
                // Requisição à API de Ranking
                const response = await api.get('/api/ranking/global'); 
                setRanking(response.data);
            } catch (err) {
                console.error("Erro ao buscar ranking:", err);
                if (err.response && err.response.status === 401) {
                    logout(); // Desloga se o token for inválido
                }
                setError('Falha ao carregar o Ranking. Verifique o status da API.');
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, [token, logout, navigate]);

    // Funções de Renderização Omitidas por brevidade (elas estão no seu código)
    const renderRankIcon = (index) => {
        if (index === 0) return <span style={{ fontSize: '30px', color: '#ffd700' }}>🥇</span>;
        if (index === 1) return <span style={{ fontSize: '30px', color: '#c0c0c0' }}>🥈</span>;
        if (index === 2) return <span style={{ fontSize: '30px', color: '#cd7f32' }}>🥉</span>;
        return <span style={{ fontSize: '20px', color: '#6c757d', fontWeight: 'bold' }}>#{index + 1}</span>;
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>Carregando Ranking...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Erro: {error}</div>;
    }

    return (
        <div className="p-8" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
            <div className="max-w-3xl mx-auto">
                <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
                    &larr; Voltar para Dashboard
                </Link>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center', color: '#1a1a1a' }}>
                    Ranking Global de Aprendizes
                </h1>

                {/* Bloco de Ranking (omitido por brevidade, mas está no seu código) */}
                <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                    {ranking.map((user, index) => (
                        <div key={user._id} style={{ display: 'flex', alignItems: 'center', padding: '15px 25px', borderBottom: index < ranking.length - 1 ? '1px solid #eee' : 'none', backgroundColor: index === 0 ? '#fffbe6' : 'white', borderRadius: index === 0 ? '12px 12px 0 0' : '0'}}>
                            <div style={{ flex: '0 0 50px', textAlign: 'center' }}>{renderRankIcon(index)}</div>
                            <div style={{ flex: 1, marginLeft: '15px' }}>
                                <p style={{ fontSize: '18px', fontWeight: '600', color: '#007bff' }}>{user.nome}</p>
                                <p style={{ fontSize: '12px', color: '#6c757d' }}>{user.email}</p>
                            </div>
                            <div style={{ textAlign: 'right', flex: '0 0 100px' }}>
                                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#28a745' }}>Nível {user.nivel || 1}</p>
                                <p style={{ fontSize: '14px', color: '#ffc107' }}>{user.xp} XP</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RankingPage;