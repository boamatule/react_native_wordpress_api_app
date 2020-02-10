const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = 'your send email';
const gmailPassword = 'your email';
const mailTransport = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: gmailEmail,
 pass: gmailPassword,
 },
});

exports.sendEmailConfirmation = functions.database
  .ref('/contact/{contact_id}')
  .onCreate(async (snapshot, context) => {
  const val = snapshot.val();
  const mailOptions = {
  from: 'your sending email',
  to: 'your receiving email',
  subject: 'Hey new message from ' + val.name,
  html: '<b>' + val.message + '</b>',
};
try {
  await mailTransport.sendMail(mailOptions);
  console.log(`New ${val.message ? '' : 'un'} message sent to:`,
  val.email);
  } catch (error) {
  console.error('There was an error while sending the email:', error);
  }
  return null;
});