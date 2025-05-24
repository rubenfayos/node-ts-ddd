import Config from "@config";
import { MailSender } from "@modules/mail/domain/services/mail-sender";
import nodemailer from "nodemailer";
import { injectable } from "tsyringe";

@injectable()
export class NodemailerService extends MailSender {
  private transporter = nodemailer.createTransport({
    host: Config.MAIL_HOST,
    port: Config.MAIL_PORT,
    secure: false,
    auth: Config.MAIL_USER
      ? {
          user: Config.MAIL_USER,
          pass: Config.MAIL_PASS,
        }
      : undefined,
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
    this.logger.log(`Sending email to ${to}`);

    await this.transporter.sendMail({
      from: process.env.MAIL_FROM || '"MyApp" <no-reply@myapp.com>',
      to,
      subject,
      html: body,
    });

    await this.persistEmail({
      to,
      subject,
      body,
    });
  }
}
