// src/components/Layout.jsx - CORRIGIDO COM ROTA DE TRILHAS

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { logout } = useAuth();
    
    // Estilos Básicos
    const containerStyle = { minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#333' };
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#007bff', 
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };
    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '20px',
        fontWeight: 'bold'
    };

    return (
        <div style={containerStyle}>
            <nav style={navStyle}>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    Plataforma Aprendiz
                </div>
                <div>
                    <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                    <Link to="/missions" style={linkStyle}>Missões</Link>
                    <Link to="/trilhas" style={linkStyle}>Trilhas</Link> {/* <-- NOVO LINK: Adicionado a rota de Trilhas */}
                    <Link to="/ranking" style={linkStyle}>Ranking</Link> {/* <-- NOVO LINK */}
                    <Link to="/curriculum" style={linkStyle}>Currículo</Link>
                    <button 
                        onClick={logout} 
                        style={{ ...linkStyle, marginLeft: '40px', backgroundColor: '#dc3545', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Sair
                    </button>
                </div>
            </nav>
            
            {/* O Outlet renderiza o conteúdo da página */}
            <div style={{ padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;