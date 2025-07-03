import type { Ticket } from "@modules/customer-service/domain/entity/ticket";
import type { ITicketReadRepository } from "@modules/customer-service/domain/interface/repository";
import { TicketReadRepository } from "@modules/customer-service/infraestructure/persistence/ticket/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetTicketsUseCase implements UseCaseInterface<unknown, Ticket[]> {
  constructor(
    @inject(TicketReadRepository)
    private readonly ticketReadRepository: ITicketReadRepository,
  ) {}

  async execute(data: unknown): Promise<Ticket[]> {
    const tickets = await this.ticketReadRepository.findAll();

    return tickets;
  }
}
