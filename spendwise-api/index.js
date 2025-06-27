// spendwise-api/index.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('./authMiddleware');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

// --- MIDDLEWARE GERAL ---
app.use(cors());
app.use(express.json());


// --- ROTAS PÚBLICAS (NÃO PRECISAM DE LOGIN) ---

app.get('/', (req, res) => {
  res.send('A API do SpendWise está funcionando.');
});

app.post('/api/register', async (req, res) => {
  try {
    const { email, password, companyName } = req.body;
    if (!email || !password || !companyName) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Este e-mail já está em uso.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, passwordHash, companyName },
    });
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// --- ROTAS PROTEGIDAS (PRECISAM DE LOGIN E TOKEN VÁLIDO) ---

// Usaremos dados do banco de dados em vez do mock
app.get('/api/transactions', authenticateToken, async (req, res) => {
  // No futuro, esta será uma chamada real ao banco de dados
  // Por enquanto, vamos manter o mock para o front-end não quebrar
  const mockTransactions = [
    { id: 1, date: '2025-06-25', description: 'Salário Mensal', category: 'N/A', amount: 10000, type: 'income' },
  ];
  res.json(mockTransactions);
});

// ... (as outras rotas CRUD virão aqui depois, conectadas ao banco de dados)


// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});