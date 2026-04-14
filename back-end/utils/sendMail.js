const nodemailer = require("nodemailer");

// Ab humein googleapis ya OAuth2 client ki zaroorat nahi hai
async function sendMail(targetEmail, subject, message) {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // SSL port aksar 587 se behtar kaam karta hai Render par
      secure: true, // Port 465 ke liye true zaroori hai
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Aapka 16-letter App Password
      },
      connectionTimeout: 20000, // Wait time badha diya
      socketTimeout: 20000,
    });

    const mailOptions = {
      from: `LocalPro <${process.env.EMAIL_USER}>`,
      to: targetEmail,
      subject: subject,
      text: message,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
               <h2 style="color: #333;">LocalPro Update</h2>
               <p>${message}</p>
               <br>
               <p>Team Cyber Yodha</p>
             </div>`,
    };

    const result = await transport.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return result;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
}

module.exports = sendMail;