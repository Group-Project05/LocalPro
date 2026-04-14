const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Smart Service" <${process.env.EMAIL}>`,
    to,
    subject,
    text
  });
};

module.exports = sendMail;
