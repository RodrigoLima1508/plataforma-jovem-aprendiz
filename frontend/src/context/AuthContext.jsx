// frontend/src/context/AuthContext.jsx - CORRIGIDO FINAL

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios'; // <--- CORREÇÃO: Importamos a instância configurada 'api'

// 1. Criação do Contexto
const AuthContext = createContext();

// Função que exportamos para usar o contexto nas páginas
export const useAuth = () => {
    return useContext(AuthContext);
};

// --- NOVA DEFINIÇÃO DE URL PARA DEPLOY ---
// O Vite (e Netlify) injetam variáveis que começam com VITE_
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/api/users`; 
// --- FIM DA NOVA DEFINIÇÃO ---

// 2. Componente Provedor do Contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    
    // Efeito para carregar o usuário e o token no início (se já estiver logado)
    useEffect(() => {
        if (token) {
            setToken(token);
        }
    }, [token]);

    // Função principal de Login
    const login = async (email, senha) => {
        try {
            // USAMOS 'api' AO INVES DE AXIOS
            const response = await api.post(`${API_URL}/login`, { email, senha }); 
            
            const newToken = response.data.token;
            
            // 1. Salva o token no localStorage
            localStorage.setItem('token', newToken);
            
            // 2. Atualiza o estado da aplicação
            setToken(newToken);
            setUser(response.data); 
            
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