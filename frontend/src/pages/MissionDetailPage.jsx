// frontend/src/pages/MissionDetailPage.jsx - CÓDIGO FINAL COM MÚLTIPLA ESCOLHA

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/missoes';

const MissionDetailPage = () => {
    const { token, user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [mission, setMission] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(''); // Armazena a letra da opção (A, B, C...)
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [completeLoading, setCompleteLoading] = useState(false);

    // Efeito para buscar os dados da missão
    useEffect(() => {
        const fetchMission = async () => {
            if (!token) return;

            try {
                const response = await axios.get(API_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                const foundMission = response.data.find(m => m._id === id);
                if (foundMission) {
                    setMission(foundMission);
                } else {
                    setMessage('Missão não encontrada.');
                }
            } catch (err) {
                setMessage('Erro ao carregar os detalhes da missão.');
            } finally {
                setLoading(false);
            }
        };

        fetchMission();
    }, [token, id, user]); 

    // Lógica para submeter o Quiz (envia a letra da opção)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        
        if (!selectedAnswer) {
            setMessage('Por favor, selecione uma resposta.');
            return;
        }

        setCompleteLoading(true);

        try {
            const response = await axios.post(`${API_URL}/complete`, { 
                missaoId: id,
                respostaUsuario: selectedAnswer, // Enviamos a LETRA selecionada (A, B, C, D)
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Sucesso: Redireciona para a Dashboard com sucesso
            alert(response.data.message);
            navigate('/dashboard');

        } catch (error) {
            // Falha: Resposta Incorreta (400)
            const errorMessage = error.response?.data?.message || 'Erro de conexão ou resposta incorreta.';
            setMessage(errorMessage);
        } finally {
            setCompleteLoading(false);
        }
    };
    
    // Verificação de estado
    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>Carregando Missão...</div>;
    }
    
    if (!mission) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{message || 'Missão não encontrada.'}</div>;
    }

    const isCompleted = user?.missoesConcluidas?.includes(id);

    return (
        <div className="p-8" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow" style={{ backgroundColor: 'white', color: '#333' }}>
                <Link to="/missions" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
                    &larr; Voltar para Lista de Missões
                </Link>

                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
                    {mission.titulo}
                </h1>
                <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '20px' }}>
                    Categoria: {mission.categoria} | XP: +{mission.xp}
                </p>

                {/* Descrição e Link do Material */}
                <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <p style={{ fontSize: '16px', marginBottom: '15px' }}>{mission.descricao}</p>
                    {mission.link && (
                        <p style={{ fontWeight: 'bold' }}>
                            Material de Estudo: 
                            <a href={mission.link} target="_blank" style={{ color: '#007bff', marginLeft: '10px', textDecoration: 'underline' }}>
                                Acessar Vídeo/Curso &rarr;
                            </a>
                        </p>
                    )}
                </div>

                {/* QUIZ SECTION */}
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
                    {isCompleted ? 'Missão Concluída!' : 'Validação de Conhecimento'}
                </h2>

                <div style={{ padding: '20px', border: '2px solid #007bff', borderRadius: '8px', backgroundColor: isCompleted ? '#d4edda' : '#eaf4ff' }}>
                    <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#007bff' }}>
                        Pergunta: Qual a resposta correta?
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Mapeamento das opções para Radio Buttons */}
                        {mission.opcoes.map((opcao, index) => {
                            // Converte o índice para a letra da opção (0=A, 1=B, etc.)
                            const optionLetter = String.fromCharCode(65 + index); 
                            return (
                                <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: isCompleted ? 'default' : 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="quizAnswer"
                                            value={optionLetter} // O valor enviado será A, B, C ou D
                                            onChange={(e) => setSelectedAnswer(e.target.value)}
                                            checked={selectedAnswer === optionLetter}
                                            disabled={isCompleted || completeLoading}
                                            style={{ marginRight: '10px' }}
                                        />
                                        {opcao}
                                    </label>
                                </div>
                            );
                        })}
                        
                        {message && <p style={{ color: message.includes('Resposta incorreta') ? 'red' : 'green', marginTop: '15px', marginBottom: '10px' }}>{message}</p>}

                        <button 
                            type="submit" 
                            disabled={isCompleted || completeLoading || !selectedAnswer}
                            style={{ 
                                marginTop: '20px',
                                padding: '10px 20px', 
                                backgroundColor: isCompleted ? '#28a745' : '#007bff', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px',
                                cursor: isCompleted ? 'default' : 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {isCompleted ? 'Missão Concluída' : (completeLoading ? 'Verificando...' : 'Responder e Concluir')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MissionDetailPage;