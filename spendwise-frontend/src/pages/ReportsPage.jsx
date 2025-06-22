// src/pages/ReportsPage.jsx
import React, { useState, useMemo } from 'react';
import './ReportsPage.css';

const ReportsPage = ({ transactions, categories }) => {
  // 1. States para cada um dos nossos filtros
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // all, income, expense
  const [categoryFilter, setCategoryFilter] = useState('all');

  const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // 2. Lógica de filtragem
  // useMemo garante que o recálculo só aconteça quando uma das dependências mudar.
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // Filtro de data
      if (start && transactionDate < start) return false;
      if (end && transactionDate > end) return false;

      // Filtro de tipo
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;

      // Filtro de categoria
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;

      return true; // Se passar por todos os filtros, inclui a transação
    });
  }, [transactions, startDate, endDate, typeFilter, categoryFilter]);

  // 3. Cálculos de resumo baseados nos dados JÁ filtrados
  const reportTotals = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
  }, [filteredTransactions]);

  return (
    <div className="reports-page">
      <h2>Relatórios</h2>
      
      <div className="filters-container">
        <div className="filter-group">
          <label>Data Início</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="filter-group">
          <label>Data Fim</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <div className="filter-group">
          <label>Tipo</label>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Categoria (Despesas)</label>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} disabled={typeFilter === 'income'}>
            <option value="all">Todas</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>
      
      <div className="report-summary">
        <div className="summary-card">
          <h4>Total de Receitas no Período</h4>
          <p className="income">{formatCurrency(reportTotals.totalIncome)}</p>
        </div>
        <div className="summary-card">
          <h4>Total de Despesas no Período</h4>
          <p className="expense">{formatCurrency(reportTotals.totalExpense)}</p>
        </div>
        <div className="summary-card">
          <h4>Balanço do Período</h4>
          <p>{formatCurrency(reportTotals.balance)}</p>
        </div>
      </div>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <tr key={t.id}>
              <td>{new Date(t.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
              <td>{t.description}</td>
              <td className={t.type === 'expense' ? 'expense' : 'income'}>
                {t.type === 'expense' ? '- ' : '+ '} {formatCurrency(t.amount)}
              </td>
              <td>{t.type === 'expense' ? 'Despesa' : 'Receita'}</td>
              <td>{t.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;