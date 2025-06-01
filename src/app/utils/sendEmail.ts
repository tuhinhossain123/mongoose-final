import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  // Create a transporter for SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // upgrade later with STARTTLS
    auth: {
      user: 'csetuhin55@gmail.com',
      pass: 'fzul uviu fbua jpit',
    },
  });

  await transporter.sendMail({
    from: 'csetuhin55@gmail.com', // sender address
    to, // list of receivers
    subject: 'Hello', // Subject line
    text: 'Reset your password within 10 min', // plain text body
    html, // html body
  });
};
