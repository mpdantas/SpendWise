// src/components/RecentTransactionsTable.jsx
import React from 'react';
import './RecentTransactionsTable.css';

// O componente recebe a lista de transações recentes como uma 'prop'
const RecentTransactionsTable = ({ transactions }) => {
  return (
    <div className="recent-transactions-widget">
      <h4>Transações Recentes</h4>
      <table className="recent-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {/* Verificamos se há transações. Se não, mostramos uma mensagem. */}
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                <td>{transaction.description}</td>
                <td className={transaction.type === 'expense' ? 'expense' : 'income'}>
                  {transaction.type === 'expense' ? '- ' : '+ '}
                  {transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-transactions">Nenhuma transação recente.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactionsTable;