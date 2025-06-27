// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import './LoginPage.css';

// A página recebe a função de login como uma prop
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros antigos

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha no login');
      }

      // Se o login for bem-sucedido, chama a função onLogin com o token
      if (data.token) {
        onLogin(data.token);
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h2>Bem-vindo ao SpendWise</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn" style={{width: '100%'}}>Entrar</button>
          <div className="error-message">
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;