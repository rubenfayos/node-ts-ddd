import { AggregateRoot } from "@core/domain/aggregate/aggregate-root";
import crypto from "node:crypto";

interface EventSubscriptionErrorProps {
  id: string;
  subscription_id: string;
  message: string;
  trace?: string;
}

export class EventSubscriptionError extends AggregateRoot {
  private id: string;
  public subscription_id: string;
  public message: string;
  public trace?: string;
  public occurredAt: Date;

  constructor(params: EventSubscriptionErrorProps) {
    super();
    this.id = params.id;
    this.subscription_id = params.subscription_id;
    this.message = params.message;
    this.trace = params.trace;
    this.occurredAt = new Date();
  }

  static create(props: Omit<EventSubscriptionErrorProps, "id">): EventSubscriptionError {
    return new EventSubscriptionError({
      ...props,
      id: crypto.randomUUID(),
    });
  }
}
