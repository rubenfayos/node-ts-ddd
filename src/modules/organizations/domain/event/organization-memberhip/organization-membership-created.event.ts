import { DomainEvent } from "@core/domain/event/domain-event";
import { OrganizationMembership } from "@modules/organizations/domain/entity/organization-membership";

export class OrganizationMembershipCreated extends DomainEvent {
  static readonly EVENT_NAME = "organization.membership_created";
  version = 0;

  public static create(organizationId: string, data: object = {}): OrganizationMembershipCreated {
    const event = new OrganizationMembershipCreated(organizationId);

    event.data = data;
    event.stream = `organization:${organizationId}`;

    return event;
  }

  public getRelatedFQN(): string {
    return OrganizationMembership.name;
  }

  public getName(): string {
    return OrganizationMembershipCreated.EVENT_NAME;
  }
}
