const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
require("dotenv").config();

//Transport data to mail function, SMTP- Simple Mail Transfer Protocol
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_KEY,
  })
);

//This function we use our variables and add `messages` depending on context for booking.
const postAddedEmail = (post) => {
    transport
        .sendMail({//sendMail behöver döpas om
            from: "<skriv ett email här>",
            to: `${post.firstname} <${post.email}>`,
    })
}