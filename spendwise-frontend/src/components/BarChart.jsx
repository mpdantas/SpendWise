// src/components/BarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './BarChart.css';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

// 1. O componente agora espera receber 'chartData' como propriedade
const BarChart = ({ chartData }) => {
  // 2. As opções continuam as mesmas, pois são apenas de estilo
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#a5a7b2' } },
      title: { display: true, text: 'Resumo Mensal de Despesas', color: '#ffffff', font: { size: 18 } },
    },
    scales: {
      x: { ticks: { color: '#a5a7b2' }, grid: { color: '#2c2e33' } },
      y: { ticks: { color: '#a5a7b2' }, grid: { color: '#2c2e33' } },
    },
  };

  return (
    <div className="chart-container">
      {/* 3. O gráfico agora usa os dados dinâmicos de 'chartData' */}
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BarChart;