import type { DomainEvent } from "./domain-event";

export abstract class EventHandler<T extends DomainEvent> {
  // abstract eventName(): string;
  abstract handle(event: T): Promise<void>;
}
