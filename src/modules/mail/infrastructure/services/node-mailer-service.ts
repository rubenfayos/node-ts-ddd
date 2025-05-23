import type { MailSender } from "@modules/mail/domain/services/mail-sender";
import nodemailer from "nodemailer";
import { injectable } from "tsyringe";

@injectable()
export class NodemailerService implements MailSender {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: false, // true for port 465, false for 587
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendMail({
    to,
    subject,
    body,
  }: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM || '"MyApp" <no-reply@myapp.com>',
      to,
      subject,
      html: body,
    });
  }
}
