const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["*"]
  }
});
var port = 3001;
const cors = require('cors');
app.use(cors())

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('sendmessage', (username, msg) => {
    console.log(username)
    socket.broadcast.emit('broadcast', { 'uniqid': 123, 'username': username, 'message': msg })
  })
});

server.listen(port, () => {
  console.log(`Socket working on port: ${port}`);
});