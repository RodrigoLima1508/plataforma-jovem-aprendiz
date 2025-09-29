// src/components/Layout.jsx - MENU FINAL E ESTÁVEL (AGORA SEM LOGO, SÓ TEXTO)

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// A importação de pdjaLogo foi removida

const Layout = () => {
    const { logout } = useAuth();

    // ... (Estilos Omitidos por brevidade - você pode ter outros estilos aqui) ...

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '20px',
        fontWeight: 'bold'
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
            <nav style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '15px 30px', backgroundColor: '#007bff', color: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                {/* Voltando ao texto "PDJA" */}
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    PDJA
                </div>
                {/* Fim da mudança */}

                <div>
                    <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                    <Link to="/missions" style={linkStyle}>Missões</Link>
                    <Link to="/trilhas" style={linkStyle}>Trilhas</Link>
                    {/* CURRÍCULO E RANKING REMOVIDOS */}
                    <button 
                        onClick={logout} 
                        style={{ ...linkStyle, marginLeft: '40px', backgroundColor: '#dc3545', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Sair
                    </button>
                </div>
            </nav>
            
            <div style={{ padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;