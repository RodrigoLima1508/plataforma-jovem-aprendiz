// frontend/src/App.jsx - CÓDIGO FINAL E ESTÁVEL

import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import MissionsPage from './pages/MissionsPage';
import TrilhasPage from './pages/TrilhasPage'; 
import Layout from './components/Layout'; 
import MissionDetailPage from './pages/MissionDetailPage'; 
// ROTAS DE CURRÍCULO E RANKING REMOVIDAS

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      <Route element={<Layout />}> 
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/trilhas" element={<TrilhasPage />} /> 
          <Route path="/missions/:id" element={<MissionDetailPage />} /> 
      </Route>
    </Routes>
  );
}

export default App;