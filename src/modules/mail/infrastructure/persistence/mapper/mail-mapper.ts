import { Mail } from "@modules/mail/domain/entity/mail";
import type { Mail as PrismaMail } from "@prisma/client";

export const MailMapper = {
  toDomain(mail: PrismaMail): Mail {
    return new Mail({
      id: mail.id,
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      body: mail.body,
      createdAt: new Date(mail.created_at),
    });
  },
  toPersistence(mail: Mail): PrismaMail {
    return {
      id: mail.getId(),
      from: mail.getFrom(),
      to: mail.getTo(),
      subject: mail.getSubject(),
      body: mail.getBody(),
      created_at: mail.getCreatedAt(),
    };
  },
};
