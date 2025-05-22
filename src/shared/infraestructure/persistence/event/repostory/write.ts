import type { Event } from "@shared/domain/event/event";
import type { IEventWriteRepository } from "@shared/domain/interface/event/repository";
import { PrismaService } from "@shared/infraestructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { Result } from "types-ddd";
import { EventMapper } from "../mapper/domain-event-mapper";

@singleton()
export class EventWriteRepository implements IEventWriteRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async create(event: Event): Promise<Result<Event>> {
    const prismaEvent = EventMapper.toPersistence(event);

    const createdEvent = await this.db.client.event.create({
      data: prismaEvent,
    });

    return Result.Ok(EventMapper.toDomain(createdEvent));
  }
}
