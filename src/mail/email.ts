import { convert } from 'html-to-text';
import { config } from '../config/configuration';
import { AccountEntity } from '../modules/auth/entities/account.entity';
import nodemailer from 'nodemailer';
import pug from 'pug';

export default class Email {
  firstName: string;
  to: string;
  from: string;
  constructor(public accountEntity: AccountEntity, public url: string) {
    this.firstName = accountEntity.firstName;
    this.to = accountEntity.email;
    this.from = `EFISS <${process.env.EMAIL_FROM}>`;
  }

  private newTransport() {
    return nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      auth: {
        user: config.smtp.username,
        pass: config.smtp.password,
      },
    });
  }

  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/templates/${template}.pug`, {
      firstName: this.firstName,
      subject,
      url: this.url,
    });

    // Create mailOptions
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: convert(html),
      html,
    };

    // Send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendVerifyEmail() {
    await this.send('verify-email', 'Please Verify Your Email Address');
  }

  async sendPasswordResetEmail() {
    await this.send('reset-password', 'Your Password Reset Token (valid for 10 minutes)');
  }
}
