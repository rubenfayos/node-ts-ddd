import type { Ticket } from "@modules/customer-service/domain/entity/ticket";

export interface ITicketWriteRepository {
  create(ticket: Ticket): Promise<void>;
}

export interface ITicketReadRepository {
  findAll(): Promise<Ticket[]>;
  findById(id: string): Promise<Ticket | null>;
}
