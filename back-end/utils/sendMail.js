const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, subject, text) => {
  try {
    const response = await resend.emails.send({
      from: 'LocalPro <onboarding@resend.dev>',
      to: to, // Yaad rahe: Testing mein wahi email daalein jisse Resend signup kiya hai
      subject: subject,
      text: text,
    });

    // Resend ka naya version { data, error } return karta hai
    const { data, error } = response;

    if (error) {
      console.error("Resend API Error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully! ID:", data.id);
    return data;

  } catch (error) {
    console.error("Internal sendMail Error:", error.message);
    throw error;
  }
};

module.exports = sendMail;