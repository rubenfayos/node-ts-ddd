import type { Organization } from "@modules/organizations/domain/entity/organization";
import type { IOrganizationReadRepository } from "@modules/organizations/domain/interface/organization-repository";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { OrganizationMapper } from "../../mappers/organization-mapper";

@singleton()
export class OrganizationReadRepository implements IOrganizationReadRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async getById(id: string): Promise<Organization | null> {
    const organization = await this.db.client.organization.findUnique({
      where: {
        id,
      },
    });

    return organization ? OrganizationMapper.toDomain(organization) : null;
  }

  async getByName(name: string): Promise<Organization | null> {
    throw new Error("Method not implemented.");
  }
}
