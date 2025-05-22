import { type Aggregate, EventHandler, type Result } from "types-ddd";
import { Event } from "./event";

export abstract class DomainEvent<T> extends EventHandler<T> {
  public readonly eventName: string;
  public readonly occurredAt: Date;
  public readonly relatedId: string;
  public readonly userId?: string;
  public readonly source?: string;

  constructor(
    relatedId: string,
    options?: {
      userId?: string;
      source?: string;
      occurredAt?: Date;
    },
  ) {
    const ctor = new.target as typeof DomainEvent;
    const eventName = (ctor as any).NAME;

    if (!eventName) {
      throw new Error(`${ctor.name} is missing static NAME field.`);
    }

    super({ eventName });
    this.eventName = eventName;
    this.relatedId = relatedId;
    this.occurredAt = options?.occurredAt ?? new Date();
    this.userId = options?.userId;
    this.source = options?.source;
  }

  async dispatch(aggregate: T): Promise<void> {
    await this.handle(aggregate);
  }

  protected abstract handle(aggregate: T): Promise<void>;
  protected abstract getRelatedFQN(): string;

  public getEvent(aggregate: T): Result<Event> {
    const auditEvent = Event.create({
      type: this.eventName,
      relatedId: this.relatedId,
      userId: this.userId,
      source: this.source,
      occurredAt: this.occurredAt,
      payload: this.toObject(aggregate),
    });

    return auditEvent;
  }

  protected toObject(aggregate: any): object {
    if (typeof aggregate?.toObject === "function") {
      return aggregate.toObject();
    }
    return aggregate;
  }
}
