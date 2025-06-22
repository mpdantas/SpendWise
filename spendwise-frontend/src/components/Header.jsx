// src/components/Header.jsx (Com a correção da exportação)
import React from 'react';
import './Header.css';

const Header = () => {
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
    </header>
  );
};

// A LINHA MAIS IMPORTANTE - GARANTA QUE ELA ESTEJA AQUI
export default Header;