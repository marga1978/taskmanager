//------------------
// Create a campaign\
// ------------------
// Include the Brevo library\
// var SibApiV3Sdk = require("sib-api-v3-sdk");
// var defaultClient = SibApiV3Sdk.ApiClient.instance;
// //Instantiate the client\
// var apiKey = defaultClient.authentications["api-key"];
// apiKey.apiKey ="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";
// var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
// var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
// //Define the campaign settings\
// emailCampaigns.name = "Campaign sent via the API";
// emailCampaigns.subject = "My subject";
// emailCampaigns.sender = {
//   name: "From name",
//   email: "myfromemail@mycompany.com",
// };
// emailCampaigns.type = "classic";
// //Content that will be sent\
// //htmlContent: "Congratulations! You successfully sent this example campaign via the Brevo API.";
// //Select the recipients\
// // recipients: {
// //   listIds: [2, 7];
// //}
// //Schedule the sending in one hour\
// // scheduledAt: '2018-01-01 00:00:01'

// //# Make the call to the client\
// apiInstance.createEmailCampaign(emailCampaigns).then(
//   function (data) {
//     console.log("API called successfully. Returned data: " + data);
//   },
//   function (error) {
//     console.error(error);
//   }
// );

// // // const brevo = require('@getbrevo/brevo');
// // // let defaultClient = brevo.ApiClient.instance;

// // // let apiKey = defaultClient.authentications['api-key'];
// // // apiKey.apiKey = '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';

// // // let apiInstance = new brevo.TransactionalEmailsApi();
// // // let sendSmtpEmail = new brevo.SendSmtpEmail();

// // // sendSmtpEmail.subject = "My {{params.subject}}";
// // // sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
// // // sendSmtpEmail.sender = { "name": "John", "email": "example@brevo.com" };
// // // sendSmtpEmail.to = [
// // //   { "email": "marco.galante78@gmail.com", "name": "Marco" }
// // // ];
// // // sendSmtpEmail.replyTo = { "email": "brevo@brevo.com", "name": "John" };
// // // sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
// // // sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
// // // sendSmtpEmail.messageVersions = [{
// // //     "to": [
// // //       {
// // //         "email": "brevo@brevo.com",
// // //         "name": "John"
// // //       }
// // //     ],
// // //     "headers": {
// // //       "Message-Id": "<123.124@smtp-relay.mailin.fr>"
// // //     },
// // //     "params": {
// // //       "greeting": "Welcome onboard!",
// // //       "headline": "Be Ready for Takeoff."
// // //     },
// // //     "subject": "+001",
// // //     "htmlContent": "<html><body><h1>+001 content</h1></body></html>"
// // //   },
// // //   {
// // //     "to": [
// // //       {
// // //         "email": "marco.galante78@gmail.com",
// // //         "name": "Marco"
// // //       }
// // //     ],
// // //     "params": {
// // //       "greeting": "Greeting 1.",
// // //       "headline": "Some bathing suits you might like"
// // //     },
// // //     "subject": "+002"
// // // }];

// // // apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
// // //   console.log('API called successfully. Returned data: ' + JSON.stringify(data));
// // // }, function (error) {
// // //   console.error(error);
// // // });



//////////////////////////////////////////////////////////

// var brevo = require("@getbrevo/brevo");
// var defaultClient = brevo.ApiClient.instance;

// // Configure API key authorization: api-key
// var apiKey = defaultClient.authentications["api-key"];
// apiKey.apiKey ="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";
// // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
// //apiKey.apiKeyPrefix = 'Token';

// // Configure API key authorization: partner-key
// var partnerKey = defaultClient.authentications["partner-key"];
// partnerKey.apiKey =
//   "Yxkeysib-5192fa554299b652823fd96436b7bb1ad0aabefb146ae144bf2af3a8b2bc1b62-j587RXlW0AkSzHzS";
// // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
// //partnerKey.apiKeyPrefix = 'Token';

// var apiInstance = new brevo.TransactionalEmailsApi();

// var sendSmtpEmail = new brevo.SendSmtpEmail({
//   sender: { email: "brevo@brevo.com", name: "Brevo" },
//   subject: "This is my default subject line",
//   htmlContent:
//     "<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
//   params: {
//     greeting: "This is the default greeting",
//     headline: "This is the default headline",
//   },
//   messageVersions: [
//     //Definition for Message Version 1
//     {
//       to: [
//         {
//           email: "marco.galante78@gmail.com",
//           name: "marco galante",
//         },
//         {
//           email: "marco.galante78js@gmail.com",
//           name: "Anne Smith",
//         },
//       ],
//       htmlContent:
//         "<!DOCTYPE html><html><body><h1>Modified header!</h1><p>This is still a paragraph</p></body></html>",
//       subject: "We are happy to be working with you",
//     },

//     // Definition for Message Version 2
//     {
//       to: [
//         {
//           email: "jim@example.com",
//           name: "Jim Stevens",
//         },
//         {
//           email: "mark@example.com",
//           name: "Mark Payton",
//         },
//         {
//           email: "andrea@example.com",
//           name: "Andrea Wallace",
//         },
//       ],
//     },
//   ],
// }); // SendSmtpEmail | Values to send a transactional email

// apiInstance.sendTransacEmail(sendSmtpEmail).then(
//   function (data) {
//     console.log("API called successfully. Returned data: " + data);
//   },
//   function (error) {
//     console.error(error);
//   }
// );


//mailchimp
//md-PSWkWmgc1L6ZLfP9iqVf6w



//const mailchimpTx = require("mailchimp_transactional")("md-PSWkWmgc1L6ZLfP9iqVf6w");

const mailchimp = require('@mailchimp/mailchimp_transactional')('md-PSWkWmgc1L6ZLfP9iqVf6w');

async function callPing() {
  const response = await mailchimp.users.ping();
  console.log(response);
}

callPing();

//
// const mailchimp1 = require("mailchimp_transactional")(
//   "md-PSWkWmgc1L6ZLfP9iqVf6w"
// );

const message = {
  from_email: "marco.galante78js@gmail.com",
  subject: "Hello world",
  text: "Welcome to Mailchimp Transactional!",
  to: [
    {
      email: "marco.galante78@gmail.com",
      type: "to"
    }
  ]
};

async function run() {
  const response = await mailchimp.messages.send({
    message
  });
  console.log(response);
}
run();
