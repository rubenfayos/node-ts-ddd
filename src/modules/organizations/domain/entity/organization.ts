import { AggregateRoot } from "@core/domain/aggregate/aggregate-root";
import crypto from "node:crypto";

interface OrganizationProps {
  id: string;
  name: string;
  createdAt: Date;
}

export class Organization extends AggregateRoot {
  private readonly id: string;
  private readonly name: string;
  private readonly createdAt: Date;

  constructor(props: OrganizationProps) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
  }

  static create(props: Omit<OrganizationProps, "id" | "createdAt">): Organization {
    return new Organization({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    });
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getCreatedAt() {
    return this.createdAt;
  }
}
