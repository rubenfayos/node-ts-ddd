import type { Organization } from "@modules/organizations/domain/entity/organization";
import type { IOrganizationReadRepository } from "@modules/organizations/domain/interface/organization-repository";
import { singleton } from "tsyringe";

@singleton()
export class OrganizationReadRepository implements IOrganizationReadRepository {
  async getById(id: string): Promise<Organization | null> {
    throw new Error("Method not implemented.");
  }

  async getByName(name: string): Promise<Organization | null> {
    throw new Error("Method not implemented.");
  }
}
