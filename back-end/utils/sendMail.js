const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    pool: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
    },
  });

  await transporter.sendMail({
    from: `"Smart Service" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
  });
};

module.exports = sendMail;
