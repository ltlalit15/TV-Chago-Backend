import nodemailer from "nodemailer";
import dotenv from "dotenv";

// 🔐 Load .env variables
dotenv.config();

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

    const info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
  });

  return info; // ✅ Important: return the result
};

export default sendEmail;
