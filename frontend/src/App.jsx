// src/App.jsx - CÓDIGO FINAL COM TODAS AS ROTAS

import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import CurriculumPage from './pages/CurriculumPage';
import MissionsPage from './pages/MissionsPage';
import TrilhasPage from './pages/TrilhasPage'; // <-- NOVO: Importe a página de Trilhas
import Layout from './components/Layout'; // Importe o componente de Layout
import MissionDetailPage from './pages/MissionDetailPage'; // <-- NOVO
import RankingPage from './pages/RankingPage';

function App() {
  return (
    
    <Routes>

      <Route path="/missions/:id" element={<MissionDetailPage />} /> 
      {/* 1. Rota de Login (Pública) */}
      <Route path="/" element={<LoginPage />} />
      
      {/* 2. Rotas Protegidas (Aninhadas dentro do Layout) */}
      <Route element={<Layout />}> 
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} /> 
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/trilhas" element={<TrilhasPage />} /> 
          <Route path="/ranking" element={<RankingPage />} /> 
    
      </Route>
    </Routes>
  );
}

export default App;