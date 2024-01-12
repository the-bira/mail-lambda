import { Handler } from 'aws-lambda';
import * as nodemailer from 'nodemailer';

interface EmailDTO {
  name: string;
  email: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY
  }
});

const sendEmail: Handler<EmailDTO> = async (event) => {
  const { name, email, message } = event;

  const mailOptions = {
    from: 'noreply@example.com',
    to: email,
    subject: 'Subject of your email',
    text: `Hello ${name},\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' })
    };
  }
};

export { sendEmail };