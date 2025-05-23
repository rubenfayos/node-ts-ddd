import { getHandlerNamesFor } from "@shared/domain/event/decorators";
import type { DomainEvent } from "@shared/domain/event/domain-event";
import { Event } from "@shared/domain/event/event";
import { EventWriteRepository } from "@shared/infraestructure/persistence/event/repostory/write";
import { inject, injectable, singleton } from "tsyringe";
import { EventPublisher } from "./event-published";

@singleton()
@injectable()
export class EventDispatcher {
  constructor(
    @inject(EventWriteRepository)
    private readonly eventWriteRepository: EventWriteRepository,

    @inject(EventPublisher)
    private readonly publisher: EventPublisher,
  ) {}

  async dispatch(event: DomainEvent): Promise<void> {
    const handlerNames = getHandlerNamesFor(event.getName());

    const eventData = Event.create({
      relatedId: event.relatedId,
      occurredAt: new Date(event.occurredAt),
      source: event.source,
      type: event.getName(),
      userId: event.userId,
      data: {},
    });

    const createdEvent = await this.eventWriteRepository.create(eventData, handlerNames);

    await this.publisher.publish(event, createdEvent.getId());
  }
}
