var socket = io();

function scrollToBottom() {
  //selectors
  var messages = jQuery('#messages');


  var newMessage = messages.children('li:last');

  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  // console.log(newMessage.html());
  // alert(newMessage.html());

  //var total1 = clientHeight + scrollTop + newMessageHeight + lastMessageHeight;
  //alert(messages.html());


  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  //console.log('newMessage', message);

  var formattedTime = moment(message.createdAt).format('h:mm a');

  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);

  //building templates with mustache
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt : formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

});

socket.on('newLocationMessage', function(message){

  var formattedTime = moment(message.createdAt).format('h:mm a');

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);

  //building templates with mustache
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt : formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage',{
      from: 'User',
      text: messageTextbox.val()
    },function(){
      messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  }) //takes two function

});
