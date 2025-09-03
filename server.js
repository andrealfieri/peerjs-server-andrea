const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;

// CORS global (inclui /peerjs)
app.use(cors());

// Healthcheck
app.get('/', (req, res) => {
  res.send('Servidor de sinalização PeerJS está ativo e funcionando.');
});

// Sobe HTTP
const server = app.listen(port, () => {
  console.log(`Servidor HTTP rodando na porta ${port}`);
});

// Cria PeerServer. OBS: path aqui é RELATIVO ao mount point
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/',    // path interno do peer sob o mount point
});

// Monta em /peerjs => endpoints ficam /peerjs/id, /peerjs/peerjs/..., etc.
app.use('/peerjs', peerServer);

// Logs
peerServer.on('connection', (client) => {
  console.log(`[LOG] Cliente conectado: ${client.getId()}`);
});
peerServer.on('disconnect', (client) => {
  console.log(`[LOG] Cliente desconectado: ${client.getId()}`);
});
