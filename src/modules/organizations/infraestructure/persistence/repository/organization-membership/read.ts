import type { OrganizationMembership } from "@modules/organizations/domain/entity/organization-membership";
import type { IMembershipReadRepository } from "@modules/organizations/domain/interface/organization-membership-repository";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { OrganizationMembershipMapper } from "@modules/organizations/infraestructure/persistence/mappers/organization-membership-mapper";
import type { Prisma } from "@prisma/client";

type MembershipFilter = Prisma.OrganizationMembershipWhereInput;

@singleton()
export class OrganizationMembershipReadRepository implements IMembershipReadRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async getById(membershipId: string): Promise<OrganizationMembership | null> {
    const membership = await this.db.client.organizationMembership.findUnique({
      where: { id: membershipId },
    });

    return membership ? OrganizationMembershipMapper.toDomain(membership) : null;
  }

  async getByUserAndOrganization(
    userId: string,
    organizationId: string,
  ): Promise<OrganizationMembership | null> {
    const membership = await this.db.client.organizationMembership.findUnique({
      where: { user_id_organization_id: { user_id: userId, organization_id: organizationId } },
    });

    return membership ? OrganizationMembershipMapper.toDomain(membership) : null;
  }

  async getByOrganization(
    organizationId: string,
    query: Record<string, string>,
  ): Promise<OrganizationMembership[]> {
    const where: MembershipFilter = {
      organization_id: organizationId, // or organization_id depending on your schema
    };

    if (query.role) {
      where.role = query.role;
    }

    const memberships = await this.db.client.organizationMembership.findMany({
      where,
    });

    return memberships.map(OrganizationMembershipMapper.toDomain);
  }
}
