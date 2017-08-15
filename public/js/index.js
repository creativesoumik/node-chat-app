var socket =  io(); // this socket will communicate with server and keep the server open

socket.on('connect', function()  {
  console.log('Connected to server');
});

socket.on('disconnect', function()  {
  console.log('Disconnected from server');

  socket.emit('createMessage', {
    from: 'Soumik',
    text: 'Its good!'
  });

});

socket.on('newMessage', function (message) { // get the object sent by the server as the first argument
  console.log('newMessage', message);
});
