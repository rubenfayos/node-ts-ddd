import crypto from "node:crypto";
import { EventSubscriptionStatus } from "@shared/domain/enum/event-subscription-status.enum";
import { AggregateRoot } from "@core/domain/aggregate/aggregate-root";

interface EventSubscriptionProps {
  id: string;
  eventId: string;
  handlerName: string;
}

export class EventSubscription extends AggregateRoot {
  private id: string;
  public eventId: string;
  public handlerName: string;
  public status: EventSubscriptionStatus;
  public retries: number;
  public executedAt: Date | null;

  constructor(params: EventSubscriptionProps) {
    super();
    this.id = params.id;
    this.eventId = params.eventId;
    this.handlerName = params.handlerName;
    this.status = EventSubscriptionStatus.PENDING;
    this.retries = 0;
    this.executedAt = null;
  }

  static create(props: Omit<EventSubscriptionProps, "id">): EventSubscription {
    return new EventSubscription({
      ...props,
      id: crypto.randomUUID(),
    });
  }

  complete() {
    this.status = EventSubscriptionStatus.COMPLETED;
    this.executedAt = new Date();
  }
}
