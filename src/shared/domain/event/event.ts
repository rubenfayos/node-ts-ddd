import crypto from "node:crypto";
import { AggregateRoot } from "../aggregate/aggregate-root";

export interface EventProps {
  id: string;
  type: string;
  relatedId: string;
  userId?: string;
  source?: string;
  occurredAt?: Date;
  stream?: string;
  data: object;
}

export class Event extends AggregateRoot {
  private id: string;
  public occurredAt: Date;
  public relatedId: string;
  public userId?: string;
  public source?: string;
  public type: string;
  public root: string;
  public data: object;
  public stream?: string;

  constructor(params: EventProps) {
    super();
    this.id = params.id;
    this.type = params.type;
    this.root = Event.extractRoot(params.type);
    this.relatedId = params.relatedId;
    this.userId = params.userId;
    this.source = params.source;
    this.data = params.data;
    this.stream = params.stream;
    this.occurredAt = params.occurredAt ?? new Date();
  }

  static create(props: Omit<EventProps, "id">): Event {
    return new Event({
      ...props,
      id: crypto.randomUUID(),
    });
  }

  static extractRoot(type: string): string {
    return type.split(".")[0];
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getRoot() {
    return this.root;
  }

  getData() {
    return this.data;
  }

  getOccurredAt() {
    return this.occurredAt;
  }

  getRelatedId() {
    return this.relatedId;
  }

  getUserId() {
    return this.userId;
  }

  getSource() {
    return this.source;
  }

  getStream() {
    return this.stream;
  }
}
