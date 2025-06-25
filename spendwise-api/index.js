// spendwise-api/index.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // <-- 1. Adicione esta linha para que o Express entenda JSON no corpo das requisições.

let mockTransactions = [ // Usamos 'let' para poder modificar a lista
  { id: 1, date: '2025-06-25', description: 'Salário Mensal', category: 'N/A', amount: 10000, type: 'income' },
  { id: 2, date: '2025-06-25', description: 'Aluguel', category: 'Moradia', amount: 1980, type: 'expense' },
  { id: 3, date: '2025-06-24', description: 'Supermercado', category: 'Alimentação', amount: 450.75, type: 'expense' },
  { id: 4, date: '2025-06-23', description: 'Gasolina', category: 'Transporte', amount: 150, type: 'expense' },
];

// Rota GET para ler todas as transações
app.get('/api/transactions', (req, res) => {
  res.json(mockTransactions);
});

// --- 2. NOVA ROTA POST PARA ADICIONAR UMA TRANSAÇÃO ---
app.post('/api/transactions', (req, res) => {
  // O 'req.body' contém os dados enviados pelo front-end
  const newTransaction = {
    id: Date.now(), // Cria um novo ID
    ...req.body // Pega todos os outros dados (descrição, valor, etc.)
  };

  mockTransactions.push(newTransaction); // Adiciona à nossa lista "mock"
  console.log('Transação adicionada:', newTransaction);
  
  res.status(201).json(newTransaction); // Responde com status 201 (Created) e a transação criada
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

// Rota DELETE para excluir uma transação
app.delete('/api/transactions/:id', (req, res) => {
  // 1. Pega o ID que vem na URL (ex: /api/transactions/123)
  const transactionId = parseInt(req.params.id, 10);

  // 2. Filtra a lista, mantendo apenas as transações com ID diferente
  const initialLength = mockTransactions.length;
  mockTransactions = mockTransactions.filter(t => t.id !== transactionId);

  // 3. Verifica se algo foi realmente deletado
  if (mockTransactions.length < initialLength) {
    console.log(`Transação com ID ${transactionId} deletada.`);
    // Status 204 significa "No Content" (sucesso, sem conteúdo para retornar)
    res.status(204).send(); 
  } else {
    // Se nenhum ID correspondeu, retorna um erro 404 "Not Found"
    res.status(404).json({ message: 'Transação não encontrada' });
  }
});