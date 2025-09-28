// src/App.jsx - FINAL COM ORDEM CORRETA

import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import CurriculumPage from './pages/CurriculumPage';
import MissionsPage from './pages/MissionsPage';
import TrilhasPage from './pages/TrilhasPage';
import Layout from './components/Layout'; 
import MissionDetailPage from './pages/MissionDetailPage'; // <-- NÃO ESQUECER

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      <Route element={<Layout />}> 
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} /> 
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/trilhas" element={<TrilhasPage />} /> 
          <Route path="/ranking" element={<RankingPage />} /> 
          
          {/* MOVEMOS O DETALHE PARA O FINAL */}
          <Route path="/missions/:id" element={<MissionDetailPage />} /> 
      </Route>
    </Routes>
  );
}

export default App;