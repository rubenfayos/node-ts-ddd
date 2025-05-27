import type { Ticket } from "@modules/customer-service/domain/entity/ticket";
import type { ITicketReadRepository } from "@modules/customer-service/domain/interface/repository";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";
import { singleton, inject } from "tsyringe";
import { TicketMapper } from "./ticket-mapper";

@singleton()
export class TicketReadRepository implements ITicketReadRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async findAll(): Promise<Ticket[]> {
    const tickets = await this.db.client.ticket.findMany();

    return tickets.map(TicketMapper.toDomain);
  }
  async findById(id: string): Promise<Ticket | null> {
    const ticket = await this.db.client.ticket.findUnique({
      where: { id },
    });

    return ticket ? TicketMapper.toDomain(ticket) : null;
  }
}
