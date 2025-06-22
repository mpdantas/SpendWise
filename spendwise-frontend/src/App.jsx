// src/App.jsx (Versão Final Completa e Corrigida)

import React, { useState, useMemo, useEffect } from 'react';

// Componentes e Páginas
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardCard from './components/DashboardCard';
import BarChart from './components/BarChart';
import AreaChart from './components/AreaChart';
import TodoList from './components/TodoList';
import RecentTransactionsTable from './components/RecentTransactionsTable';
import CalendarWidget from './components/CalendarWidget';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';
import ReportsPage from './pages/ReportsPage';

// Estilos e Ícones
import './App.css';
import { FaDollarSign, FaChartBar, FaChartPie } from 'react-icons/fa';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const [transactions, setTransactions] = useState(() => {
    try {
      const savedTransactions = localStorage.getItem('spendwise_transactions');
      return savedTransactions ? JSON.parse(savedTransactions) : [];
    } catch (error) {
      console.error("Failed to parse transactions from localStorage", error);
      return [];
    }
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('spendwise_categories');
    return saved ? JSON.parse(saved) : ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Outros'];
  });
  
  useEffect(() => {
    localStorage.setItem('spendwise_transactions', JSON.stringify(transactions));
  }, [transactions]);
  
  useEffect(() => {
    localStorage.setItem('spendwise_categories', JSON.stringify(categories));
  }, [categories]);

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleUpdateTransaction = (id, updatedData) => {
    setTransactions(transactions.map(t => (t.id === id ? { ...t, ...updatedData } : t)));
  };

  const totals = useMemo(() => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, balance };
  }, [transactions]);

  const barChartData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const data = categories.map(category => expenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0));
    return { labels: categories, datasets: [{ label: 'Despesas por Categoria', data: data, backgroundColor: '#c81a3b' }] };
  }, [transactions, categories]);

  const areaChartData = useMemo(() => {
    const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const incomeData = Array(12).fill(0);
    const expenseData = Array(12).fill(0);
    transactions.forEach(t => {
      const month = new Date(t.date).getUTCMonth();
      if (t.type === 'income') { incomeData[month] += t.amount; } else { expenseData[month] += t.amount; }
    });
    return {
      labels,
      datasets: [
        { label: 'Receitas', data: incomeData, borderColor: '#00d25b', backgroundColor: 'rgba(0, 210, 91, 0.2)', fill: true, tension: 0.4 },
        { label: 'Despesas', data: expenseData, borderColor: 'rgba(200, 26, 59, 0.8)', backgroundColor: 'rgba(200, 26, 59, 0.2)', fill: true, tension: 0.4 },
      ],
    };
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return transactions.slice().reverse().slice(0, 5);
  }, [transactions]);

  const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="app">
      <Sidebar activePage={activePage} onMenuClick={setActivePage} />
      <main className="main-content">
        <Header />

        {/* --- CONTEÚDO DO DASHBOARD --- */}
        {/* Garanta que este bloco está completo no seu código */}
        {activePage === 'dashboard' && (
          <>
            <div className="cards-container">
              <DashboardCard icon={<FaChartBar />} title="Despesa Total" value={formatCurrency(totals.totalExpense)} />
              <DashboardCard icon={<FaDollarSign />} title="Receita Total" value={formatCurrency(totals.totalIncome)} />
              <DashboardCard icon={<FaChartPie />} title="Balanço Total" value={formatCurrency(totals.balance)} />
            </div>
            <div className="charts-section">
              <BarChart chartData={barChartData} />
              <AreaChart chartData={areaChartData} />
            </div>
            <div className="widgets-section">
              <TodoList />
              <RecentTransactionsTable transactions={recentTransactions} />
              <CalendarWidget transactions={transactions} />
            </div>
          </>
        )}

        {activePage === 'transactions' && (
          <TransactionsPage
            transactions={transactions}
            setTransactions={setTransactions}
            handleDelete={handleDeleteTransaction}
            handleUpdate={handleUpdateTransaction}
            categories={categories}
          />
        )}
        
        {activePage === 'categories' && (
          <CategoriesPage
            categories={categories}
            setCategories={setCategories}
          />
        )}

        {activePage === 'reports' && (
          <ReportsPage 
            transactions={transactions}
            categories={categories}
          />
        )}
        
        <Footer />
      </main>
    </div>
  );
}

export default App;