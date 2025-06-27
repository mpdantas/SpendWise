// src/components/Header.jsx
import React from 'react';
import { FaWallet } from 'react-icons/fa';
import './Header.css';

// 1. O componente agora recebe a prop 'onLogout'
const Header = ({ onLogout }) => {
  return (
    <header className="main-header">
      <div className="logo-container">
        <img 
          src="/logo.png"
          alt="SpendWise Logo" 
          className="logo-image" 
        />
        <h1 className="system-name">SpendWise</h1>
      </div>
      
      {/* 2. Adicionamos o botão de logout que chama a função onLogout ao ser clicado */}
      <button onClick={onLogout} className="logout-button">
        Sair
      </button>
    </header>
  );
};

export default Header;