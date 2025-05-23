import type { Event } from "@core/domain/event/event";
import type { EventSubscription } from "@shared/domain/event/event-subscription";

export interface IEventWriteRepository {
  create(event: Event, handlerNames: string[]): Promise<Event>;
  updateSubscription(event: EventSubscription): Promise<void>;
}
