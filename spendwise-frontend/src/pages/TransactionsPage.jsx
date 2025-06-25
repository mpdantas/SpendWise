// src/pages/TransactionsPage.jsx

import React, { useState, useEffect } from 'react';
import './TransactionsPage.css';

const getTodayString = () => new Date().toISOString().split('T')[0];

const TransactionsPage = ({ transactions, onAddTransaction, handleDelete, handleUpdate, categories }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(categories && categories.length > 0 ? categories[0] : '');
  const [date, setDate] = useState(getTodayString());
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (categories && categories.length > 0 && !categories.includes(category)) {
      setCategory(categories[0]);
    } else if ((!categories || categories.length === 0) && category !== '') {
      setCategory('');
    }
  }, [categories, category]);

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setType('expense');
    setCategory(categories && categories.length > 0 ? categories[0] : '');
    setDate(getTodayString());
    setEditingId(null);
  };

  const handleStartEdit = (transaction) => {
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setType(transaction.type);
    setCategory(transaction.category);
    setDate(transaction.date);
    setEditingId(transaction.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!description || !amount) {
      alert('Por favor, preencha a descrição e o valor.');
      return;
    }
    const transactionData = {
      description,
      amount: parseFloat(amount),
      type,
      category: type === 'expense' ? category : 'N/A',
      date,
    };
    if (editingId) {
      handleUpdate(editingId, transactionData);
    } else {
      // Chama a função que veio do App.jsx
      onAddTransaction(transactionData);
    }
    resetForm();
  };

  return (
    <div className="transactions-page">
      <h2>{editingId ? 'Editar Transação' : 'Adicionar Nova Transação'}</h2>
      <form className="transaction-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ex: Salário, Aluguel"/>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Valor (R$)</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"/>
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Despesa</option>
            <option value="income">Receita</option>
          </select>
        </div>
        {type === 'expense' && (
          <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} disabled={!categories || categories.length === 0}>
              {categories && categories.length > 0 ? (
                categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))
              ) : (
                <option>Crie uma categoria primeiro</option>
              )}
            </select>
          </div>
        )}
        <button type="submit" className="submit-btn">
          {editingId ? 'Salvar Alterações' : 'Adicionar'}
        </button>
        {editingId && (
          <button type="button" className="cancel-btn" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>
      <h2>Histórico de Transações</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
              <td>{transaction.description}</td>
              <td className={transaction.type === 'expense' ? 'expense' : 'income'}>
                {transaction.type === 'expense' ? '- ' : '+ '}
                R$ {transaction.amount.toFixed(2)}
              </td>
              <td>{transaction.type === 'expense' ? 'Despesa' : 'Receita'}</td>
              <td>{transaction.category}</td>
              <td>
                <button onClick={() => handleStartEdit(transaction)} className="action-button edit-button">Editar</button>
                <button onClick={() => handleDelete(transaction.id)} className="action-button delete-button">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;