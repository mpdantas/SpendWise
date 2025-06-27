// src/components/CalendarWidget.jsx

import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import './CalendarWidget.css';

// Função auxiliar para garantir que a data esteja no formato YYYY-MM-DD
const toYYYYMMDD = (date) => {
  const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return adjustedDate.toISOString().split("T")[0];
}

const CalendarWidget = ({ transactions }) => {
  const transactionDates = useMemo(() => {
    return new Set(transactions.map(t => t.date));
  }, [transactions]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = toYYYYMMDD(date);
      if (transactionDates.has(dateString)) {
        return 'has-transaction';
      }
    }
    return null;
  };

  // Função que força a abreviação dos dias da semana
  const formatShortWeekday = (locale, date) => {
    // Retorna as 3 primeiras letras do dia da semana, em maiúsculas.
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date).slice(0, 3).toUpperCase();
  };

  return (
    <div className="calendar-widget">
      <h4>Calendário</h4>
      <Calendar
        tileClassName={tileClassName}
        locale="pt-BR"
        // Prop que garante que os dias da semana sejam abreviados
        formatShortWeekday={formatShortWeekday}
      />
    </div>
  );
};

export default CalendarWidget;