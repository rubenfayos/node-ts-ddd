import type { Organization } from "@modules/organizations/domain/entity/organization";
import type { IOrganizationWriteRepository } from "@modules/organizations/domain/interface/organization-repository";
import { inject, singleton } from "tsyringe";
import { OrganizationMapper } from "@modules/organizations/infraestructure/persistence/mappers/organization-mapper";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";

@singleton()
export class OrganizationWriteRepository implements IOrganizationWriteRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async create(organization: Organization): Promise<void> {
    await this.db.client.organization.create({
      data: OrganizationMapper.toPersistence(organization),
    });
  }
}
