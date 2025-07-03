import type { IEventReadRepository } from "@core/domain/interface/event/repository";
import { inject, singleton } from "tsyringe";
import { PrismaService } from "../../prisma/prisma-service";
import type { Event } from "@core/domain/event/event";
import { EventMapper } from "../mapper/domain-event-mapper";

@singleton()
export class EventReadRepository implements IEventReadRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async getById(eventId: string): Promise<Event | null> {
    const event = await this.db.client.event.findUnique({
      where: { id: eventId },
    });

    return event ? EventMapper.toDomain(event) : null;
  }
  async getByStream(stream: string): Promise<Event[]> {
    const events = await this.db.client.event.findMany({
      where: { stream },
    });

    return events.map(EventMapper.toDomain);
  }
}
