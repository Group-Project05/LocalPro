const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, subject, text) => {
  try {
    const data = await resend.emails.send({
      from: 'LocalPro <onboarding@resend.dev>',
      to: to,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully via Resend:", data.id);
    return data;
  } catch (error) {
    console.error("Resend Error:", error);
    throw error;
  }
};

module.exports = sendMail;