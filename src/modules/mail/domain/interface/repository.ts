import type { Mail } from "@modules/mail/domain/entity/mail";

export interface IMailReadRepository {
  findById(id: string): Promise<Mail | null>;
}

export interface IMailWriteRepository {
  create(mail: Mail): Promise<void>;
}
