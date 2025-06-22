// src/components/AreaChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import './AreaChart.css';

// O registro do ChartJS já é feito no App.jsx ou no outro componente, mas é mais seguro manter aqui.
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// 1. Componente agora recebe 'chartData'
const AreaChart = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#a5a7b2' } },
      title: { display: true, text: 'Evolução Anual: Receitas vs. Despesas', color: '#ffffff', font: { size: 18 } },
    },
    scales: {
      x: { ticks: { color: '#a5a7b2' }, grid: { color: '#2c2e33' } },
      y: { ticks: { color: '#a5a7b2' }, grid: { color: '#2c2e33' } },
    },
  };

  return (
    <div className="chart-container">
      {/* 2. Gráfico usa os dados dinâmicos */}
      <Line options={options} data={chartData} />
    </div>
  );
};

export default AreaChart;