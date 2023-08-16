import { convert } from 'html-to-text';
import nodemailer from 'nodemailer';
import pug from 'pug';
import { config } from '../../config/configuration';
import path from 'path';
import { SMTP_HOST, SMTP_PORT } from '../../loaders/constants';

export default class Email {
  from: string;
  constructor(public recipientName: string, public recipientEmail: string, public url: string) {
    this.from = `EFISS <${process.env.EMAIL_FROM}>`;
  }

  private newTransport() {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: config.smtp.username,
        pass: config.smtp.password,
      },
    });
  }

  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(path.join(`${__dirname}`, `templates/${template}.pug`), {
      name: this.recipientName,
      subject,
      url: this.url,
    });

    // Create mailOptions
    const mailOptions = {
      from: this.from,
      to: this.recipientEmail,
      subject,
      text: convert(html),
      html,
    };

    // Send email
    const result = await this.newTransport().sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        // console.log(info);
      }
    });
  }

  async sendVerifyEmail() {
    await this.send('verify-email', 'Please Verify Your Email Address');
  }

  async sendPasswordResetEmail() {
    await this.send('reset-password', 'Your Password Reset Token (valid for 10 minutes)');
  }
}
