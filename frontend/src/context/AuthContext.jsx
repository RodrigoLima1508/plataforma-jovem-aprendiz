// frontend/src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Criação do Contexto
const AuthContext = createContext();

// Função que exportamos para usar o contexto nas páginas
export const useAuth = () => {
    return useContext(AuthContext);
};

// 2. Componente Provedor do Contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    
    // URL base da nossa API (o servidor Node.js)
    // Usamos o endereço de rede do Codespace para a comunicação Back-end <-> Front-end
    const API_URL = 'http://localhost:5000/api/users'; 

    // Efeito para carregar o usuário e o token no início (se já estiver logado)
    useEffect(() => {
        if (token) {
            // Se houver um token, tentamos buscar os dados do perfil (próximo passo!)
            // Para simplificar agora, apenas definimos o token
            setToken(token);
        }
    }, [token]);

    // Função principal de Login
    const login = async (email, senha) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, senha });
            
            const newToken = response.data.token;
            
            // 1. Salva o token no localStorage
            localStorage.setItem('token', newToken);
            
            // 2. Atualiza o estado da aplicação
            setToken(newToken);
            setUser(response.data); // Salva os dados do usuário (ID, nome, XP, etc.)
            
            return true; // Login bem-sucedido
            
        } catch (error) {
            console.error('Erro no Login:', error.response.data.message);
            return false; // Login falhou
        }
    };
    
    const logout = () => {
        // Limpa o armazenamento e o estado
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};