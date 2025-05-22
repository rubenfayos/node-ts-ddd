import { Aggregate, type EntityProps, _Adapter } from "types-ddd";
import type { DomainEvent } from "../event/domain-event";

export class AggregateRoot<T extends EntityProps> extends Aggregate<any> {
  private events: DomainEvent<any>[];

  constructor(props: T) {
    super(props);
    this.events = [];
  }

  registerEvent(event: DomainEvent<any>) {
    this.events.push(event);
    this.addEvent(event);
  }

  getEvents() {
    return this.events;
  }
}
