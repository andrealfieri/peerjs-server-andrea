const { PeerServer } = require("peer");

// A Heroku nos dá a porta através de uma variável de ambiente.
const port = process.env.PORT || 9000;

const peerServer = PeerServer({
  port: port,
  path: "/myapp", // O "caminho" da nossa aplicação no servidor
});

console.log(`Servidor PeerJS rodando na porta ${port}`);