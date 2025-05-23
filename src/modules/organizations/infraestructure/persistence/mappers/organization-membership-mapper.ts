import { OrganizationMembership } from "@modules/organizations/domain/entity/organization-membership";
import type { OrganizationMembership as PrismaOrganizationMembership } from "@prisma/client";

export const OrganizationMembershipMapper = {
  toDomain(raw: PrismaOrganizationMembership): OrganizationMembership {
    return new OrganizationMembership({
      id: raw.id,
      userId: raw.user_id,
      organizationId: raw.organization_id,
      role: raw.role,
    });
  },

  toPersistence(membership: OrganizationMembership): PrismaOrganizationMembership {
    return {
      id: membership.getId(),
      user_id: membership.getUserId(),
      organization_id: membership.getOrganizationId(),
      role: membership.getRole(),
    };
  },
};
