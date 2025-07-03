import type { Mail } from "@modules/mail/domain/entity/mail";
import type { IMailWriteRepository } from "@modules/mail/domain/interface/repository";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { MailMapper } from "../mapper/mail-mapper";

@singleton()
export class MailWriteRepository implements IMailWriteRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}
  async create(mail: Mail): Promise<void> {
    await this.db.client.mail.create({
      data: MailMapper.toPersistence(mail),
    });
  }
}
