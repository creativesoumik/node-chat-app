var nodemailer = require('nodemailer');
var fs = require('fs');



const getUserPass = ()=>{
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('server/utils/smtp-pass.json', 'utf8'));
  console.log('********PASSWORDS*********',obj);
  return obj;
}




/*
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

*/




//
// transporter.verify(function(error, success) {
//    if (error) {
//         console.log(error);
//    } else {
//         console.log('Server is ready to take our messages');
//    }
// });



  const sendNodemailer = (mailOptions) => {
    return new Promise((resolve, reject) => {

      var cred = getUserPass();

      // var transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'classicweddingimages@gmail.com',
      //     pass: 'cla123321'
      //   }
      // });

      let transporter = nodemailer.createTransport({
        pool: true,
        host: 'port80.smtpcorp.com',
        port: 80,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: cred.user,
            pass: cred.pass
        }
      });

      console.log(mailOptions);
      transporter.sendMail(mailOptions, function(error, info){

        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info.response);
        }
      });
    });
  };


  const sendMail = async (from, to, subject, emailBody) => {

    var mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: emailBody
    };



    const mailReport = await sendNodemailer(mailOptions);
    return mailReport;

  }


//var newEmail = new Mailer().send("soumik", "creativesoumik@yahoo.com", "email from node 2", "Hi Node!");
// var newEmail2 = sendMail("Soumik Dasgupta<soumikdasgupta1@gmail.com>", "creativesoumik@yahoo.com", "email from node 6", "Hi Async!").then((mailReport) => {
//   console.log('Email was sent', mailReport);
// }).catch((error) => {
//   console.log(error);
// });

module.exports = {sendMail};
