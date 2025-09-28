// frontend/src/pages/MissionsPage.jsx - CORRIGIDO FINAL PARA DEPLOY

import React, { useState, useEffect } from 'react';
import api from '../api/axios'; // <--- USAMOS A INSTÂNCIA CONFIGURADA
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; 


const MissionsPage = () => {
    const { token } = useAuth();
    const [missoes, setMissoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMissoes = async () => {
            if (!token) return;

            try {
                // CORREÇÃO: Usa 'api.get' e o caminho direto da API
                const response = await api.get('/api/missoes'); 
                setMissoes(response.data); 
            } catch (err) {
                setError('Falha ao carregar as missões. Verifique se o Render está ativo.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMissoes();
    }, [token]);

    // ... (O restante do código de renderização fica aqui) ...
    // ... (Apenas cole o que está dentro do 'return') ...

    return (
        <div className="p-8" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
            <div className="max-w-7xl mx-auto">
                <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
                    &larr; Voltar para Dashboard
                </Link>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>
                    Todas as Missões Disponíveis ({missoes.length})
                </h1>

                {missoes.length === 0 ? (
                    <p style={{ textAlign: 'center', fontSize: '18px' }}>Nenhuma missão encontrada. Crie uma via Insomnia para testar!</p>
                ) : (
                    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {missoes.map((missao) => (
                            <div key={missao._id} style={{ 
                                backgroundColor: 'white', 
                                padding: '20px', 
                                borderRadius: '8px', 
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                borderLeft: '5px solid #007bff' 
                            }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#007bff' }}>{missao.titulo}</h2>
                                <p style={{ fontSize: '14px', marginBottom: '15px' }}>{missao.descricao}</p>
                                <p style={{ fontSize: '16px', fontWeight: '500', marginTop: '10px' }}>
                                    XP: <span style={{ color: '#28a745' }}>+{missao.xp}</span> | Categoria: {missao.categoria}
                                </p>
                                
                                <Link 
                                    to={`/missions/${missao._id}`}
                                    style={{ 
                                        display: 'inline-block',
                                        padding: '10px 20px', 
                                        backgroundColor: '#ffc107', 
                                        color: 'black', 
                                        textDecoration: 'none', 
                                        border: 'none', 
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        marginTop: '15px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Ver Detalhes e Quiz
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MissionsPage;