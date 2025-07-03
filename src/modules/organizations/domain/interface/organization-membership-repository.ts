import type { PaginatedResult } from "@shared/common/utils/prisma-utils";
import type { OrganizationMembership } from "../entity/organization-membership";
import type { MembershipQueryParams } from "@modules/organizations/infraestructure/persistence/repository/organization-membership/read";

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
    params: MembershipQueryParams,
  ): Promise<PaginatedResult<OrganizationMembership>>;
}
