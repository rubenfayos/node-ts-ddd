import type { AggregateRoot } from "@shared/domain/aggregate/aggregate-root";
import type { IEventWriteRepository } from "@shared/domain/interface/event/repository";
import { inject, singleton } from "tsyringe";
import { EventWriteRepository } from "../persistence/event/repostory/write";

@singleton()
export class EventDispatcher {
  constructor(
    @inject(EventWriteRepository)
    private readonly eventWriteRepository: IEventWriteRepository,
  ) {}

  async dispatchEvents<T extends AggregateRoot<T>>(aggregate: T): Promise<void> {
    const events = aggregate.getEvents();

    for (const event of events) {
      aggregate.dispatchEvent(event.eventName);

      const result = event.getEvent(event);

      if (result.isFail()) continue;

      await this.eventWriteRepository.create(result.value());
    }
  }
}
