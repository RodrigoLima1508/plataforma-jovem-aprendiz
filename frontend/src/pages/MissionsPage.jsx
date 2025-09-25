// frontend/src/pages/MissionsPage.jsx - CÓDIGO FINAL CORRIGIDO COM LINK

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Importante: Componente Link

const API_URL = 'http://localhost:5000/api/missoes';

const MissionsPage = () => {
    const { token } = useAuth();
    const [missoes, setMissoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Efeito para buscar as missões quando o componente é carregado
    useEffect(() => {
        const fetchMissoes = async () => {
            if (!token) return;

            try {
                // Requisição protegida, enviando o token
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMissoes(response.data); // Recebe o array de missões
            } catch (err) {
                setError('Falha ao carregar as missões. Tente novamente.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMissoes();
    }, [token]);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>Carregando Missões...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Erro: {error}</div>;
    }

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
                    <div className="grid gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
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
                                
                                {/* CORREÇÃO: Usamos o componente Link para criar o link dinâmico */}
                                <Link 
                                    to={`/missions/${missao._id}`} // <--- Passamos o ID da missão na URL
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