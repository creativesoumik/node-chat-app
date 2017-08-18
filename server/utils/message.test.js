var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message'); // using ES6 destructuring

describe('generateMessage', () => {
  it('should generate correct message object', () => { // no need to provide done since its not asynchronus function
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate location correct message object', () => { // no need to provide done since its not asynchronus function
    var from = 'Deb';
    var latitude = '15';
    var longitude = '19';
    var url = 'https://www.google.com/maps?q=15,19'
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
