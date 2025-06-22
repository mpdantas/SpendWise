// src/components/TodoList.jsx
import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  // --- STATES ---
  // State para a lista de tarefas. Cada tarefa será um objeto com id, texto e status.
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Pagar a fatura do cartão', completed: false },
    { id: 2, text: 'Fazer o relatório mensal', completed: true },
  ]);

  // State para controlar o que está sendo digitado no campo de texto.
  const [inputText, setInputText] = useState('');

  // --- FUNÇÕES ---
  const handleAddTask = (e) => {
    e.preventDefault(); // Impede o formulário de recarregar a página
    if (inputText.trim() === '') return; // Não adiciona tarefa vazia

    const newTask = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    setTasks([...tasks, newTask]); // Adiciona a nova tarefa à lista
    setInputText(''); // Limpa o campo de texto
  };

  const handleToggleTask = (id) => {
    // Cria uma nova lista, mapeando sobre a antiga
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
      // Se a tarefa tiver o id correspondente, inverte o status 'completed'. Senão, mantém a tarefa como está.
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    // Cria uma nova lista contendo apenas as tarefas que NÃO têm o id correspondente.
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  // --- RENDERIZAÇÃO ---
  return (
    <div className="todo-list-widget">
      <h4>To-Do List</h4>
      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Adicionar nova tarefa..."
        />
        <button type="submit">Add</button>
      </form>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => handleToggleTask(task.id)} className="task-text">
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(task.id)} className="delete-button">×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;