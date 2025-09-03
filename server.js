const express = require('express');
const cors = require('cors');
const { ExpressPeerServer } = require('peer'); // Importa a versão para Express

// Criação da aplicação Express
const app = express();
const port = process.env.PORT || 9000;

// Habilita o CORS para todas as requisições
app.use(cors());

// Rota de "saúde" para verificar se o servidor está online.
// Esta rota agora irá funcionar.
app.get('/', (req, res, next) => {
    res.send('Servidor de sinalização PeerJS está ativo.');
});

// Inicia o servidor HTTP para ouvir na porta especificada.
const server = app.listen(port, () => {
    console.log(`Servidor HTTP rodando na porta ${port}`);
});

// Cria uma instância do PeerServer para Express.
const peerServer = ExpressPeerServer(server, {
    path: '/myapp' // O PeerServer só vai lidar com requisições neste caminho
});

// Diz para a aplicação Express usar o PeerServer.
// Todas as requisições para /myapp/* serão gerenciadas pelo PeerServer.
app.use(peerServer);

// Log para confirmar que o PeerServer está escutando.
peerServer.on('connection', (client) => {
    console.log(`Cliente conectado: ${client.getId()}`);
});
