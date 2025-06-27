// spendwise-api/authMiddleware.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // O token geralmente vem no cabeçalho 'Authorization' no formato "Bearer TOKEN"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Pega apenas a parte do token

  if (token == null) {
    // Se não há token, retorna 401 Unauthorized (Não autorizado)
    return res.sendStatus(401); 
  }

  // Verifica se o token é válido e não expirou
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Se o token for inválido (ex: expirou, assinatura errada), retorna 403 Forbidden (Proibido)
      return res.sendStatus(403); 
    }

    // Se o token for válido, salvamos os dados do usuário na requisição (req)
    // para que as rotas futuras possam saber quem é o usuário.
    req.user = user;

    // Libera a passagem para a próxima função (a rota em si)
    next(); 
  });
}

module.exports = authenticateToken;