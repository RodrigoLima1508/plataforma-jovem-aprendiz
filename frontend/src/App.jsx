// src/App.jsx - CÓDIGO FINAL E CORRETO PARA O DEPLOY

import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import CurriculumPage from './pages/CurriculumPage';
import MissionsPage from './pages/MissionsPage';
import TrilhasPage from './pages/TrilhasPage';
import Layout from './components/Layout'; 
import MissionDetailPage from './pages/MissionDetailPage';
import RankingPage from './pages/RankingPage'; // <--- ESTA LINHA ESTAVA FALTANDO OU QUEBROU

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
          <Route path="/missions/:id" element={<MissionDetailPage />} /> 
      </Route>
    </Routes>
  );
}

export default App;