// carico il modulo
const nodemailer = require("nodemailer");

// definisco il trasporto
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "*************@gmail.com",
    pass: "********",
  },
});;

const sendWelcomeEmail = (email, name) => {
  

  const mailOptions = {
    from: "marco.galante78js@gmail.com",
    to: email,
    subject: "Thanks for joining in!",
    //text: 'Sgart.it' // invia il corpo in plaintext
    html: `Welcome to the app, ${name}. Let me know how you get along with the app.`, // invia il corpo in html
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Messaggio inviato: " + info.response);
    }
  });
};

const sendCancelationEmail = (email, name) => {
  // messaggio da inviare
  const mailOptions = {
    from: "marco.galante78js@gmail.com",
    to: email,
    subject: "Sorry to see you go!",
    //text: 'Sgart.it' // invia il corpo in plaintext
    html: `Goodbye, ${name}. I hope to see you back sometime soon.`, // invia il corpo in html
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Messaggio inviato: " + info.response);
    }
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}

// // invio il messaggio
// transporter.sendMail(mailOptions, function(error, info){
//   if(error) {
//     console.log(error);
//   }else{
//     console.log('Messaggio inviato: ' + info.response);
//   }
// });
