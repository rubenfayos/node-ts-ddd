import { getHandlerNamesFor } from "@shared/domain/event/decorators";
import { Event } from "@core/domain/event/event";
import { EventWriteRepository } from "@shared/infrastructure/persistence/event/repostory/write";
import { inject, injectable, singleton } from "tsyringe";
import { EventPublisher } from "./event-published";
import type { DomainEvent } from "@core/domain/event/domain-event";

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
      stream: event.stream,
      data: {},
    });

    const createdEvent = await this.eventWriteRepository.create(eventData, handlerNames);

    await this.publisher.publish(event, createdEvent.getId());
  }
}
