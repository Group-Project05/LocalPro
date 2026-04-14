const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// 3 parameters: Kise bhejna hai, Kya subject hai, aur Kya message hai
async function sendMail(targetEmail, subject, message) {
  console.log("Using IPv4 Family");
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      family: 4, // YE SABSE ZAROORI HAI: Force IPv4
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `LocalPro <${process.env.EMAIL_USER}>`,
      to: targetEmail,
      subject: subject, // Ab ye dynamic hai
      text: message, // Ab ye dynamic hai
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
               <h2 style="color: #333;">LocalPro Update</h2>
               <p>${message}</p>
               <br>
               <p>Team Cyber Yodha</p>
             </div>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
}

module.exports = sendMail;
