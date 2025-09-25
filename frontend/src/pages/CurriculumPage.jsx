// frontend/src/pages/CurriculumPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// URL base da nossa API para currículos
const API_URL = 'http://localhost:5000/api/curriculo';

const CurriculumPage = () => {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        objetivo: '',
        educacao: '',
        experiencia: '',
        habilidades: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Função para atualizar o estado do formulário enquanto o usuário digita
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Função principal para enviar os dados à API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            // Chamada à API protegida, enviando o token JWT
            const response = await axios.post(`${API_URL}/generate`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage(response.data.message); // Exibe a mensagem de sucesso
        } catch (error) {
            setMessage('Erro ao salvar currículo. Certifique-se de estar logado.');
            console.error(error.response || error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow" style={{ backgroundColor: 'white', color: '#333' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                    Ferramenta de Geração de Currículo
                </h1>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* Objetivo Profissional */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Objetivo Profissional:</label>
                        <textarea
                            name="objetivo"
                            value={formData.objetivo}
                            onChange={handleChange}
                            rows="3"
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                            required
                        />
                    </div>

                    {/* Educação */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Formação/Educação:</label>
                        <textarea
                            name="educacao"
                            value={formData.educacao}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Ex: Curso de Jovem Aprendiz (2024-2025) - Senac"
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                            required
                        />
                    </div>
                    
                    {/* Habilidades */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Habilidades e Soft Skills:</label>
                        <input
                            type="text"
                            name="habilidades"
                            value={formData.habilidades}
                            onChange={handleChange}
                            placeholder="Ex: Trabalho em Equipe, Comunicação, Excel Básico"
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                            required
                        />
                    </div>
                    
                    {message && <p style={{ color: message.includes('sucesso') ? 'green' : 'red', textAlign: 'center', marginBottom: '15px' }}>{message}</p>}

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ width: '100%', padding: '10px', backgroundColor: loading ? '#6c757d' : '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        {loading ? 'Salvando...' : 'Salvar e Gerar Currículo'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CurriculumPage;