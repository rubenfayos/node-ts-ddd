import type { DomainEvent } from "../event/domain-event";

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[];

  constructor() {
    this.domainEvents = [];
  }

  registerEvent(event: DomainEvent) {
    this.domainEvents.push(event);
  }

  getEvents(): DomainEvent[] {
    return this.domainEvents;
  }
}
