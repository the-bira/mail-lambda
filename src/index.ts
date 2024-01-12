import { APIGatewayProxyHandler } from 'aws-lambda';
import nodemailer from 'nodemailer';

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

const sendEmail: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const { name, email, message } = body;

  const mailOptions = {
    from: 'noreply@example.com',
    to: 'aimbererm@gmail.com',
    subject: `Message from ${name}`,
    text: `${message}\n\nSent from: ${email} (${name})`
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

export const handler = sendEmail;
