import type { Mail } from "@modules/mail/domain/entity/mail";
import type { IMailReadRepository } from "@modules/mail/domain/interface/repository";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { MailMapper } from "../mapper/mail-mapper";

@singleton()
export class MailReadRepository implements IMailReadRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}
  async findById(id: string): Promise<Mail | null> {
    const mail = await this.db.client.mail.findUnique({
      where: {
        id,
      },
    });

    return mail ? MailMapper.toDomain(mail) : null;
  }
}
