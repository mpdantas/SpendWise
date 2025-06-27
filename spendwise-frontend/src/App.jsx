// src/App.jsx (Versão Final e Refatorada)

import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import AuthenticatedApp from './AuthenticatedApp'; // Importa nosso novo componente principal
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('spendwise_token'));

  const handleLogin = (receivedToken) => {
    localStorage.setItem('spendwise_token', receivedToken);
    setToken(receivedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('spendwise_token');
    setToken(null);
  };

  // Se não há token, mostra a página de login.
  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Se há um token, mostra a aplicação principal.
  return <AuthenticatedApp onLogout={handleLogout} />;
}

export default App;