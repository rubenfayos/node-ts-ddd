import { AggregateRoot } from "@core/domain/aggregate/aggregate-root";
import crypto from "node:crypto";

type MailProps = {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  createdAt?: Date;
};

export class Mail extends AggregateRoot {
  private id: string;
  private from: string;
  private to: string;
  private subject: string;
  private body: string;
  private createdAt: Date;

  constructor(props: MailProps) {
    super();

    this.id = props.id;
    this.from = props.from;
    this.to = props.to;
    this.subject = props.subject;
    this.body = props.body;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(data: Omit<MailProps, "id">): Mail {
    const mail = new Mail({
      ...data,
      id: crypto.randomUUID().toString(),
      createdAt: new Date(),
    });
    return mail;
  }

  getId() {
    return this.id;
  }

  getFrom() {
    return this.from;
  }

  getTo() {
    return this.to;
  }

  getSubject() {
    return this.subject;
  }

  getBody() {
    return this.body;
  }

  getCreatedAt() {
    return this.createdAt;
  }
}
