// src/components/CalendarWidget.jsx
import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import './CalendarWidget.css'; // Usaremos um CSS customizado para o tema escuro

// Função para formatar uma data para o formato YYYY-MM-DD
const toYYYYMMDD = (date) => {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
    .toISOString()
    .split("T")[0];
}

const CalendarWidget = ({ transactions }) => {
  // Criamos um conjunto (Set) com todas as datas que possuem transações.
  // Usar um Set é muito mais rápido para fazer buscas do que um array.
  const transactionDates = useMemo(() => {
    return new Set(transactions.map(t => t.date));
  }, [transactions]);

  // Esta função é chamada para cada dia do calendário.
  // Ela verifica se o dia tem uma transação e adiciona uma classe CSS se tiver.
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = toYYYYMMDD(date);
      if (transactionDates.has(dateString)) {
        return 'has-transaction'; // Nome da nossa classe CSS de destaque
      }
    }
    return null;
  };

  return (
    <div className="calendar-widget">
      <h4>Calendário</h4>
      <Calendar
        tileClassName={tileClassName}
        locale="pt-BR" // Deixa o calendário em português
      />
    </div>
  );
};

export default CalendarWidget;