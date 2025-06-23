// src/components/Sidebar.jsx (com o novo item de menu)

import React from 'react';
import './Sidebar.css';

function Sidebar({ activePage, onMenuClick }) {
  return (
    <div className="sidebar">
      <div className="user-panel">
        <div className="user-info">
          <h4>MD Tech</h4>
        </div>
      </div>
      
      <ul className="nav-menu">
        <li 
          className={activePage === 'dashboard' ? 'active' : ''}
          onClick={() => onMenuClick('dashboard')}
        >
          Dashboard
        </li>
        
        {/* --- NOVO ITEM ADICIONADO AQUI --- */}
        <li
          className={activePage === 'charts' ? 'active' : ''}
          onClick={() => onMenuClick('charts')}
        >
          Gráficos
        </li>
        {/* ---------------------------------- */}
        
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