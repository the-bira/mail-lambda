import { Handler } from 'aws-lambda';
import * as nodemailer from 'nodemailer';

interface EmailDTO {
  name: string;
  email: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  // Configure nodemailer transporter, e.g., SMTP settings
  service: 'YourEmailService',
  auth: {
    user: 'YourEmail@example.com',
    pass: 'YourPassword'
  }
});

const sendEmail: Handler<EmailDTO> = async (event) => {
  const { name, email, message } = event;

  const mailOptions = {
    from: 'YourEmail@example.com',
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
