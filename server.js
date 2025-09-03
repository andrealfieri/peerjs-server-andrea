const express = require('express');
const { PeerServer } = require('peer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;

// Habilita o CORS para todas as requisições.
// Isso diz ao navegador que seu servidor permite conexões de outros domínios (como andrealfieri.com.br)
app.use(cors());

// Rota de "saúde" para verificar se o servidor está online.
app.get('/', (req, res) => {
  res.send('Servidor de sinalização está ativo.');
});

// Inicia o servidor HTTP.
const server = app.listen(port, () => {
  console.log(`Servidor HTTP rodando na porta ${port}`);
});

// Inicia o PeerServer e o anexa ao nosso servidor HTTP existente.
const peerServer = PeerServer({
  server: server, // Anexa ao servidor Express
  path: '/myapp'  // O mesmo caminho que o cliente espera
});

console.log(`Servidor PeerJS escutando em ${peerServer.path}`);
