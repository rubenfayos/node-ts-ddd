import { Organization } from "@modules/organizations/domain/entity/organization";
import type { Organization as PrismaOrganization } from "@prisma/client";

export const OrganizationMapper = {
  toDomain(raw: PrismaOrganization): Organization {
    return new Organization({
      id: raw.id,
      name: raw.name,
      createdAt: raw.created_at,
    });
  },

  toPersistence(organization: Organization): PrismaOrganization {
    return {
      id: organization.getId(),
      name: organization.getName(),
      created_at: organization.getCreatedAt(),
    };
  },
};
