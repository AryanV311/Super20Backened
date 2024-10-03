// utils/sendEmail.js
import nodemailer from "nodemailer"
// import ".dotenv/config"

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS  // Your Gmail App Password
  }
});

/**
 * Send an email
 * @param {String} to - Recipient's email address
 * @param {String} subject - Email subject
 * @param {String} text - Email body
 */
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmail;
