const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {sendMail} = require('./utils/mailer');



const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  //console.log('New user connected');


  io.emit('updateRoomList', users.getRoomList());



  //join room
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required.'); // use return not to allow any code below to work
    }

    var roomName = params.room.toUpperCase();

    var user = users.findUser(params.name, roomName);

    if (user) {
      socket.join(roomName); // joining a socket room by any string, in this case the room name from index form
      // socket.leave // leave from room

      users.removeUser(user.id);
      users.addUser(user.id, user.name, roomName);
      io.to(roomName).emit('updateUserList', users.getUserList(roomName));
    } else {
      socket.join(roomName); // joining a socket room by any string, in this case the room name from index form
      // socket.leave // leave from room

      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, roomName);
      io.to(roomName).emit('updateUserList', users.getUserList(roomName));

      //io.emit --> io.to('The Room Name').emit() //emits to every single user
      //socket.broadcast.emit --> socket.broadcast.to('The room name').emit() //every one but except current user

      //socket.emit --> specific to one user
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

      //broadcast to everyone but except who initiated
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    }

    callback();

  });

  //use the callback function to send event acknoledgements to clients - this is appliable for both client and server
  socket.on('createMessage', (message, callback) => {
    //console.log('createMessage', message);

    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }


    callback();

    // send data to client by assigning object to the callback arguement

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });


  //use the callback function to send event acknoledgements to clients - this is appliable for both client and server
  socket.on('sendInvitation', (emails, callback) => {
    //console.log('emails to invite', emails);

     var user = users.getUser(socket.id);
     if (user) {

       sendMail(`Soumik ChatApp<info@pixondesign.com>`, emails, 'Join my chat room', `
         <p>${user.name} has requested you to join his private chat room :</p>
         <p><a href="https://obscure-springs-48742.herokuapp.com/?room=${user.room}">Go To Room</a></p>`)
         .then((mailReport) => {

           console.log(mailReport);
           socket.emit('newMessage', generateMessage('Admin', 'Your friends have been invited'));
           callback();
         }).catch((error) => {
           callback(error);
         });
     }

  });


  //use the callback function to send event acknoledgements to clients - this is appliable for both client and server
  socket.on('userTyping', (userId, callback) => {


     var user = users.getUser(userId);

     //console.log('typing', user.name);

     if (user) {

       //socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

       socket.broadcast.to(user.room).emit('showUserTyping', {
         userId: userId,
         msg: `<div id="${userId}" class="userTypingLabel">${user.name} is typing..</div>`
       });

     }

    callback();

  });


  socket.on('createLocationMessage', (coords) => {

    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }


  });

  socket.on('disconnect', () => {
    //console.log('User was disconnected');

    var user = users.removeUser(socket.id);

    //if a user was removed and we are going to perform some action.
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }




  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
