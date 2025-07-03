import type { Organization } from "@modules/organizations/domain/entity/organization";

export interface IOrganizationWriteRepository {
  create(organization: Organization): Promise<void>;
}

export interface IOrganizationReadRepository {
  getById(id: string): Promise<Organization | null>;
  getByName(name: string): Promise<Organization | null>;
}
