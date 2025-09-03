// server.js
const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = process.env.PORT || 9000;

// CORS para todo o app (inclui 404 também)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // Libere seu domínio (e subdomínios 'www') — pode usar '*' para teste
  const allowed = ['https://andrealfieri.com.br', 'https://www.andrealfieri.com.br'];
  if (origin && allowed.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*'); // pode apertar depois
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('/*', (_req, res) => res.sendStatus(204)); // preflight

app.get('/', (_req, res) => res.send('PeerJS signaling OK'));

// Sobe HTTP
const server = app.listen(PORT, () => {
  console.log(`HTTP on ${PORT}`);
});

// PeerServer montado em /peerjs com path interno /live
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/live',
  proxied: true, // Render/proxies
  corsOptions: {
    origin: ['https://andrealfieri.com.br', 'https://www.andrealfieri.com.br'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  }
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
  console.log(`[peer] connected: ${client.getId()}`);
});
peerServer.on('disconnect', (client) => {
  console.log(`[peer] disconnected: ${client.getId()}`);
});
