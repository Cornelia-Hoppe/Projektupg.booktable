const { text } = require("express");
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
require("dotenv").config();

//Transport data to mail function, SMTP- Simple Mail Transfer Protocol
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: "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",
  })
);

//This function we use our variables and add `messages` depending on context for booking.
const postAddedEmail = (post) => {
    transport
        .sendMail({
            from: "dreamwave_kim@hotmail.se",
            to: `${post.firstname} <${post.email}>`,
            subject: "Booking received",
            text: `Hello ${post.firstname}, your booking has been receieved!`,
            html: `<h1>Your booking has been received</h1>
                <p>Hi ${post.firstname}, your booking has been received</p>
                <p>We will get back to you soon!</p>
                <p>Have a great day!</p>`,
    })
    .then(() => console.log("Email sent"))
    .catch((err) => console.log(err));
};

exports.postAddedEmail = postAddedEmail;
