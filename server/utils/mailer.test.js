var expect = require('expect');

const {Mailer} = require('./mailer');

var mailer = new Mailer();

  describe('Mailer Functions', () => {

    var user = {
      name : 'Soumik',
      room : 'Mayfair'
    };
    var emails = 'creativesoumik@yahoo.com';

    it('should send an email', (done) => { // no need to provide done since its not asynchronus function
      // mailer.send(user.name, emails, 'Join my chat room', `
      //   <p>${user.name} has requested you to join his private chat room :</p>
      //   <p><a href="https://obscure-springs-48742.herokuapp.com/?room=${user.room}"></a>Go To Room</p>`);

        mailer.send("soumik", "creativesoumik@yahoo.com", "email from node 3", "Hi Node!", () => {
        console.log('email was sent');
        done();
      });

    });
  });
