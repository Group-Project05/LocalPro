const nodemailer = require("nodemailer");

// Ab humein googleapis ya OAuth2 client ki zaroorat nahi hai
async function sendMail(targetEmail, subject, message) {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Wo 16-character code jo aapne generate kiya
      },
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