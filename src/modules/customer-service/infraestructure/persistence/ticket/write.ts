import type { Ticket } from "@modules/customer-service/domain/entity/ticket";
import type { ITicketWriteRepository } from "@modules/customer-service/domain/interface/repository";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { TicketMapper } from "./ticket-mapper";

@singleton()
export class TicketWriteRepository implements ITicketWriteRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async create(ticket: Ticket): Promise<void> {
    await this.db.client.ticket.create({
      data: TicketMapper.toPersistence(ticket),
    });
  }
}
