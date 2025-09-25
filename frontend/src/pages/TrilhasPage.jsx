// frontend/src/pages/TrilhasPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/trilhas';

const TrilhasPage = () => {
    const { token } = useAuth();
    const [trilhas, setTrilhas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrilhas = async () => {
            if (!token) return;

            try {
                // Requisição protegida para buscar as trilhas (com missões populadas)
                const response = await axios.get(API_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTrilhas(response.data);
            } catch (err) {
                setError('Falha ao carregar as trilhas.');
            } finally {
                setLoading(false);
            }
        };

        fetchTrilhas();
    }, [token]);


    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>Carregando Trilhas...</div>;
    if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Erro: {error}</div>;

    return (
        <div className="p-8" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
            <div className="max-w-7xl mx-auto">
                <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
                    &larr; Voltar para Dashboard
                </Link>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>
                    Trilhas de Carreira Disponíveis ({trilhas.length})
                </h1>

                {trilhas.length === 0 ? (
                    <p style={{ textAlign: 'center', fontSize: '18px' }}>Nenhuma trilha encontrada. Crie uma via Insomnia para testar!</p>
                ) : (
                    <div style={{ display: 'grid', gap: '20px', 
                        // Responsividade: 1 coluna em mobile, 2 em desktop
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' 
                    }}>
                        {trilhas.map((trilha) => (
                            <div key={trilha._id} style={{ 
                                backgroundColor: 'white', 
                                padding: '25px', 
                                borderRadius: '8px', 
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                borderLeft: '8px solid #007bff' 
                            }}>
                                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#007bff' }}>{trilha.nome}</h2>
                                <p style={{ fontSize: '16px', marginBottom: '15px' }}>{trilha.descricao}</p>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '20px' }}>Missões na Trilha:</h3>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                                    {trilha.missoes.map((missao) => (
                                        <li key={missao._id} style={{ fontSize: '14px', marginBottom: '5px' }}>
                                            {missao.titulo} (+{missao.xp} XP)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrilhasPage;