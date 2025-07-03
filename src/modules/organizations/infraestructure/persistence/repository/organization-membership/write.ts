import type { OrganizationMembership } from "@modules/organizations/domain/entity/organization-membership";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { OrganizationMembershipMapper } from "@modules/organizations/infraestructure/persistence/mappers/organization-membership-mapper";
import type { IMembershipWriteRepository } from "@modules/organizations/domain/interface/organization-membership-repository";

@singleton()
export class OrganizationMembershipWriteRepository implements IMembershipWriteRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async create(membership: OrganizationMembership): Promise<void> {
    await this.db.client.organizationMembership.create({
      data: OrganizationMembershipMapper.toPersistence(membership),
    });
  }

  async delete(membershipId: string): Promise<void> {
    await this.db.client.organizationMembership.delete({
      where: { id: membershipId },
    });
  }
}
