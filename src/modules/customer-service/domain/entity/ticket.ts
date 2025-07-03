import { AggregateRoot } from "@core/domain/aggregate/aggregate-root";
import crypto from "node:crypto";

interface TicketProps {
  id: string;
  title: string;
  description: string;
  priority: string;
  userId?: string;
  createdAt: Date;
  attachments?: string[];
}

export class Ticket extends AggregateRoot {
  private id: string;
  private title: string;
  private description: string;
  private priority: string;
  private userId?: string;
  private createdAt: Date;
  private attachments?: string[];

  constructor(props: TicketProps) {
    super();
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.priority = props.priority;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.attachments = props.attachments;
  }

  static create(props: Omit<TicketProps, "id" | "createdAt">) {
    const ticket = new Ticket({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    });

    return ticket;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getPriority() {
    return this.priority;
  }

  getUserId() {
    return this.userId;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getAttachments() {
    return this.attachments;
  }
}
