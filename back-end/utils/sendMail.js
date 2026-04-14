const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 30000, 
    greetingTimeout: 30000,
    socketTimeout: 30000,
    tls: {
      rejectUnauthorized: false, 
      minVersion: "TLSv1.2"
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP Connection Verified!");

    const info = await transporter.sendMail({
      from: `"LocalPro" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
    });
    
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Nodemailer Error Trace:", error);
    throw error;
  }
};

module.exports = sendMail;