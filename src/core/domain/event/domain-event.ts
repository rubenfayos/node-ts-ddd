export abstract class DomainEvent {
  abstract version: number;

  public occurredAt: Date;
  public relatedId: string;
  public userId?: string;
  public source?: string;
  public stream?: string;
  public data: object = {};

  constructor(relatedId: string, occurredAt?: Date) {
    this.relatedId = relatedId;
    this.occurredAt = occurredAt ?? new Date();
  }

  public abstract getRelatedFQN(): string;
  public abstract getName(): string;

  public static extractRoot(type: string): string {
    return type.split(".")[0];
  }
  // public getEvent(aggregate: T): Result<Event> {
  //   const auditEvent = Event.create({
  //     type: this.eventName,
  //     relatedId: this.relatedId,
  //     userId: this.userId,
  //     source: this.source,
  //     occurredAt: this.occurredAt,
  //     payload: this.toObject(aggregate),
  //   });

  //   return auditEvent;
  // }

  // protected toObject(aggregate: any): object {
  //   if (typeof aggregate?.toObject === "function") {
  //     return aggregate.toObject();
  //   }
  //   return aggregate;
  // }
}
