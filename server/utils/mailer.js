var nodemailer = require('nodemailer');

class Mailer {


  send(from, to, subject, emailBody, callback) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'classicweddingimages@gmail.com',
        pass: 'cla123321'
      }
    });

    var mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: emailBody
    };

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {

        console.log('Email sent: ' + info.response);
        callback();
      }
    });


  }

}

//var newEmail = new Mailer().send("soumik", "creativesoumik@yahoo.com", "email from node 2", "Hi Node!");

module.exports = {Mailer};
