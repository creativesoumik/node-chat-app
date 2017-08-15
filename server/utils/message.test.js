var expect = require('expect');

var {generateMessage} = require('./message'); // using ES6 destructuring

describe('generateMessage', () => {
  it('should generate correct message object', () => { // no need to provide done since its not asynchronus function
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
