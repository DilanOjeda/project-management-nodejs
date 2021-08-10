const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');
const { options } = require('../routes/projects');

let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass // generated ethereal password
    },
});

// Generate html for email
const generateHtml = (file, url = {}) => {

  const html = pug.renderFile(`${__dirname}/../views/emails/${file}.pug`, {url});
  return juice(html);
}

const sendResetPasswordEmail = async ( options ) => {

  const html = generateHtml(options.file, options.url);
  const text = htmlToText.convert(html);  

  let mailOptions = {
    from: 'Project Management <no-reply@projectmanagement.com>', // sender address
    to: options.email,
    subject: options.subject,
    text,
    html
  }

  return transporter.sendMail( mailOptions );
} 

module.exports = sendResetPasswordEmail;