import type { Event } from "@core/domain/event/event";
import type { EventSubscription } from "@shared/domain/event/event-subscription";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { EventMapper } from "../mapper/domain-event-mapper";
import type { IEventWriteRepository } from "@core/domain/interface/event/repository";

@singleton()
export class EventWriteRepository implements IEventWriteRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async create(event: Event, handlerNames: string[]): Promise<Event> {
    const prismaEvent = EventMapper.toPersistence(event, handlerNames);

    const createdEvent = await this.db.client.event.create({
      data: prismaEvent,
    });

    return EventMapper.toDomain(createdEvent);
  }

  async updateSubscription(subscription: EventSubscription): Promise<void> {
    const updatedSubscription = await this.db.client.eventSubscription.updateMany({
      where: {
        event_id: subscription.eventId,
        handler_name: subscription.handlerName,
      },
      data: {
        status: subscription.status,
        retries: subscription.retries,
        executed_at: subscription.executedAt as Date,
      },
    });
  }
}
