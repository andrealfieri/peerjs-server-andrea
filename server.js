const express = require('express');
const cors = require('cors');
const { ExpressPeerServer } = require('peer');

// 1. Configuração básica do Express
const app = express();
const port = process.env.PORT || 9000;

// 2. Habilita o CORS para TODAS as requisições.
//    Isso é crucial e resolve o erro de "Access-Control-Allow-Origin".
app.use(cors());

// 3. Rota de verificação para sabermos que o servidor está online.
app.get('/', (req, res, next) => {
    res.send('Servidor de sinalização PeerJS está ativo e funcionando corretamente.');
});

// 4. Inicia o servidor HTTP.
const server = app.listen(port, () => {
    console.log(`Servidor HTTP rodando na porta ${port}`);
});

// 5. Cria a instância do PeerServer, feita para o Express.
const peerServer = ExpressPeerServer(server, {
    debug: true, // Habilita logs detalhados no servidor da Render
    path: '/'    // O PeerServer agora vai operar a partir da raiz do caminho
});

// 6. Monta o PeerServer no caminho '/myapp'.
//    Esta é a parte mais importante: agora, qualquer requisição para
//    https://.../myapp será gerenciada pelo PeerServer.
app.use('/myapp', peerServer);

// 7. Logs para confirmar a atividade no servidor da Render
peerServer.on('connection', (client) => {
    console.log(`[LOG] Cliente conectado: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
    console.log(`[LOG] Cliente desconectado: ${client.getId()}`);
});
