import { AggregateRoot } from "@core/domain/aggregate/aggregate-root";
import crypto from "node:crypto";
import { OrganizationMembershipCreated } from "@modules/organizations/domain/event/organization-memberhip/organization-membership-created.event";

interface OrganizationMembershipProps {
  id: string;
  userId: string;
  organizationId: string;
  role: string;
}

export class OrganizationMembership extends AggregateRoot {
  private readonly id: string;
  private readonly userId: string;
  private readonly organizationId: string;
  private readonly role: string;

  constructor(props: OrganizationMembershipProps) {
    super();
    this.id = props.id;
    this.userId = props.userId;
    this.organizationId = props.organizationId;
    this.role = props.role;
  }

  static create(props: Omit<OrganizationMembershipProps, "id">): OrganizationMembership {
    const organizationMembership = new OrganizationMembership({
      ...props,
      id: crypto.randomUUID(),
    });

    organizationMembership.registerEvent(
      OrganizationMembershipCreated.create(organizationMembership.getOrganizationId(), {
        userId: props.userId,
      }),
    );

    return organizationMembership;
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getOrganizationId() {
    return this.organizationId;
  }

  getRole() {
    return this.role;
  }
}
