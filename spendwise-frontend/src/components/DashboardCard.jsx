// src/components/DashboardCard.jsx
import React from 'react';
import './DashboardCard.css';

function DashboardCard({ icon, title, value }) {
  return (
    <div className="dashboard-card">
      <div className="card-icon">{icon}</div>
      <div className="card-info">
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
}

export default DashboardCard;