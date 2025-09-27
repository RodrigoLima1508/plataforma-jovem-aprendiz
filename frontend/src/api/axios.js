// frontend/src/api/axios.js

import axios from 'axios';

// Cria uma instância do axios configurada
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Sua URL base do Render
});

// Adiciona um interceptor de requisição
// Este código será executado antes de TODAS as chamadas para a API
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        // Se houver um token e a rota não for login/registro, anexa o token ao header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;