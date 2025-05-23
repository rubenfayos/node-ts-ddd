import type { OrganizationMembership } from "../entity/organization-membership";

export interface IMembershipWriteRepository {
  create(membership: OrganizationMembership): Promise<void>;
  delete(membershipId: string): Promise<void>;
}

export interface IMembershipReadRepository {
  getById(membershipId: string): Promise<OrganizationMembership | null>;
  getByUserAndOrganization(
    userId: string,
    organizationId: string,
  ): Promise<OrganizationMembership | null>;
  getByOrganization(
    organizationId: string,
    params: Record<string, string>,
  ): Promise<OrganizationMembership[]>;
}
