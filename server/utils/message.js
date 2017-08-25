const moment = require('moment');

var colors = ['#493CE7', '#164295', '#169559', '#957E16', '#95168D', '#952F16', '#16957A', '#166595'];

var generateMessage = (from, text) => {

  var randColor = colors[Math.floor(Math.random() * colors.length)];

  return {
    from,
    text,
    randColor,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};



module.exports = {generateMessage, generateLocationMessage};
