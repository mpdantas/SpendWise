// spendwise-api/index.js

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // 1. Importa o bcrypt
const { PrismaClient } = require('@prisma/client'); // 2. Importa o Prisma Client

const app = express();
const prisma = new PrismaClient(); // 3. Cria uma instância do Prisma Client
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- ROTAS DA API ---

// Rota GET para a página inicial (teste)
app.get('/', (req, res) => {
  res.send('A API do SpendWise está funcionando.');
});


// 4. NOVA ROTA PARA CADASTRAR UM USUÁRIO
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, companyName } = req.body;

    // Validação básica
    if (!email || !password || !companyName) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Este e-mail já está em uso.' });
    }

    // Criptografa a senha (10 é o "custo" do hash, um valor padrão e seguro)
    const passwordHash = await bcrypt.hash(password, 10);

    // Cria o usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash, // Salva o hash, não a senha original
        companyName,
      },
    });

    // Remove o hash da senha antes de enviar a resposta
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);

  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});


// As rotas de transações "mock" podem ser removidas ou comentadas depois
// por enquanto, vamos mantê-las para não quebrar nosso front-end atual.
let mockTransactions = [/* ... */];
app.get('/api/transactions', (req, res) => res.json(mockTransactions));
// ... (outras rotas mock)


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});