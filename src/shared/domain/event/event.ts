import { Aggregate, Result } from "types-ddd";

export interface EventProps {
  id?: string;
  type: string;
  relatedId: string;
  userId?: string;
  source?: string;
  occurredAt?: Date;
  payload: object;
}

export class Event extends Aggregate<EventProps> {
  public readonly occurredAt: Date;
  public readonly relatedId: string;
  public readonly userId?: string;
  public readonly source?: string;
  public readonly type: string;
  public readonly root: string;
  public readonly payload: object;

  constructor(params: EventProps) {
    super(params);
    this.type = params.type;
    this.root = Event.extractRoot(params.type);
    this.relatedId = params.relatedId;
    this.userId = params.userId;
    this.source = params.source;
    this.payload = params.payload;
    this.occurredAt = params.occurredAt ?? new Date();
  }

  static create(props: EventProps): Result<Event> {
    return Result.Ok(new Event(props));
  }

  static extractRoot(type: string): string {
    return type.split(".")[0];
  }

  getId() {
    return this.id;
  }
}
