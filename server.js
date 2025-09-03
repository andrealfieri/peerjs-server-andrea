const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;

// Habilita o CORS para a rota de verificação.
app.use(cors());

// Rota de verificação para sabermos que o servidor está online.
app.get('/', (req, res, next) => {
    res.send('Servidor de sinalização PeerJS está ativo e funcionando.');
});

// Inicia o servidor HTTP.
const server = app.listen(port, () => {
    console.log(`Servidor HTTP rodando na porta ${port}`);
});

// --- A CORREÇÃO DEFINITIVA ESTÁ AQUI ---
// Criamos o PeerServer e passamos a configuração de CORS diretamente para ele.
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/', // Opera na raiz do servidor
    allow_origin: '*' // ESTA LINHA RESOLVE O PROBLEMA DE CORS
});
// -----------------------------------------

// Monta o PeerServer para que ele gerencie as requisições de WebRTC.
app.use('/', peerServer);

// Logs para confirmar a atividade no servidor da Render
peerServer.on('connection', (client) => {
    console.log(`[LOG] Cliente conectado: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
    console.log(`[LOG] Cliente desconectado: ${client.getId()}`);
});
