const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVICE_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true,
  debug: true,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter configuration error:", error);
  } else {
    console.log("Email transporter configured successfully.");
  }
});

module.exports = transporter;
