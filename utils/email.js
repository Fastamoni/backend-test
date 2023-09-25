const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailgunTransport(auth));
module.exports = transporter