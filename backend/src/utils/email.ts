import nodemailer from 'nodemailer';
import { logger } from './logger.js';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return transporter;
}

export interface EmailOptions {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<string> {
  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: options.from,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
    });

    logger.info(`📧 Email sent: ${info.messageId}`);
    return info.messageId;
  } catch (error) {
    logger.error(`❌ Email error: ${error}`);
    throw new Error(`Failed to send email: ${error}`);
  }
}
