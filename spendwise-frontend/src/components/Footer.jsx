// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  // Pega o ano atual dinamicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer-component">
      <p>&copy; {currentYear} SpendWise. Todos os direitos reservados. Desenvolvido por MD Tech Engenharia</p>
    </footer>
  );
};

export default Footer;