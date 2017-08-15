const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

const express = require('express'); // webserver
const socketIO = require('socket.io'); // webserver

var app = express();
// var server = http.createServer((req, res) => {
//
// })

// or we can directly use the express ap to create http server

var server = http.createServer(app);
var io = socketIO(server); // socket.io automatically sends this file to client http://localhost:3000/socket.io/socket.io.js

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', { // send a object to event
    from: 'mike@example.com',
    text: 'Hey, what is going on?',
    createdAt: new Date().getTime(),
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });



}); //lets you register a event listner

app.use(express.static(publicPath));


// app.get('/',function(req,res){
//       res.sendFile(publicPath + "/index.html");
// });

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
