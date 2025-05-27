import type { OrganizationMembership } from "@modules/organizations/domain/entity/organization-membership";
import type { IMembershipReadRepository } from "@modules/organizations/domain/interface/organization-membership-repository";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { OrganizationMembershipMapper } from "@modules/organizations/infraestructure/persistence/mappers/organization-membership-mapper";
import type { Prisma } from "@prisma/client";
import { buildQuery, type PaginatedResult } from "@shared/common/utils/prisma-utils";

type MembershipFilter = Prisma.OrganizationMembershipWhereInput;

export type MembershipQueryParams = {
  where?: MembershipFilter;
  orderBy?: Prisma.OrganizationMembershipOrderByWithRelationInput;
  page?: number;
  pageSize?: number;
};

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
    params: MembershipQueryParams = {},
  ): Promise<PaginatedResult<OrganizationMembership>> {
    const where: MembershipFilter = {
      organization_id: organizationId,
      ...(params.where ?? {}),
    };

    const query = buildQuery<
      Prisma.OrganizationMembershipWhereInput,
      Prisma.OrganizationMembershipOrderByWithRelationInput
    >({
      ...params,
      where,
    });

    const [items, total] = await Promise.all([
      this.db.client.organizationMembership.findMany(query),
      this.db.client.organizationMembership.count({
        where: query.where,
      }),
    ]);

    return {
      items: items.map(OrganizationMembershipMapper.toDomain),
      total,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      totalPages: Math.ceil(total / (params.pageSize || 10)),
    };
  }
}
