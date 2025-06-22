// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

// 1. Recebemos 'activePage' e 'onMenuClick' como propriedades
function Sidebar({ activePage, onMenuClick }) {
  return (
    <div className="sidebar">
      <div className="user-panel">
        <div className="user-info">
          <h4>Jhon Doe</h4>
          <p>Admin</p>
        </div>
      </div>
      <ul className="nav-menu">
        {/* 2. Adicionamos o evento onClick para chamar a função que muda de página */}
        {/* 3. A classe 'active' agora é definida dinamicamente */}
        <li 
          className={activePage === 'dashboard' ? 'active' : ''}
          onClick={() => onMenuClick('dashboard')}
        >
          Dashboard
        </li>
        <li
          className={activePage === 'transactions' ? 'active' : ''}
          onClick={() => onMenuClick('transactions')}
        >
          Transações
        </li>
        <li
          className={activePage === 'reports' ? 'active' : ''}
          onClick={() => onMenuClick('reports')}
        >
          Relatórios
        </li>
        <li
          className={activePage === 'categories' ? 'active' : ''}
          onClick={() => onMenuClick('categories')}
        >
          Categorias
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;