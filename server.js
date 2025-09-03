const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());

// Rota de verificação.
app.get('/', (req, res, next) => {
    res.send('Servidor de sinalização PeerJS está ativo.');
});

// Inicia o servidor HTTP.
const server = app.listen(port, () => {
    console.log(`Servidor HTTP rodando na porta ${port}`);
});

// --- MUDANÇA CRUCIAL ---
// O PeerServer agora vai operar na raiz do servidor.
const peerServer = ExpressPeerServer(server, {
    debug: true
    // SEM 'path' ESPECIFICADO AQUI!
});

// Monta o PeerServer na raiz.
app.use('/', peerServer); // Ele assume o controle de tudo.

peerServer.on('connection', (client) => {
    console.log(`[LOG] Cliente conectado: ${client.getId()}`);
});
