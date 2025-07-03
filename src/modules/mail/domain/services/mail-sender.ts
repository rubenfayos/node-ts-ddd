import { MailWriteRepository } from "@modules/mail/infrastructure/persistence/repository/write";
import { inject } from "tsyringe";
import { Mail } from "@modules/mail/domain/entity/mail";
import { useLogger } from "@shared/packages/logger";

export abstract class MailSender {
  protected readonly logger = useLogger("Mail Sender");

  constructor(
    @inject(MailWriteRepository) protected readonly mailWriteRepository: MailWriteRepository,
  ) {}

  protected async persistEmail(data: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void> {
    try {
      this.logger.log("Persisting email to database");

      const mail = Mail.create({
        from: process.env.MAIL_FROM || '"MyApp" <no-reply@myapp.com>',
        to: data.to,
        subject: data.subject,
        body: data.body,
      });

      await this.mailWriteRepository.create(mail);
    } catch (e) {
      this.logger.error(e);
    }
  }

  abstract sendMail(params: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void>;
}
