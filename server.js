const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  let username = "anonymous";
  socket.on('chat message', msg => {
    io.emit('chat message', {username, msg});
  });
  socket.on("register username", newUsername => {
    username = newUsername;
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});