import { Organization } from "@modules/organizations/domain/entity/organization";
import { OrganizationMembership } from "@modules/organizations/domain/entity/organization-membership";
import type { IOrganizationWriteRepository } from "@modules/organizations/domain/interface/organization-repository";
import type { CreateOrganizationInput } from "@modules/organizations/infraestructure/http/contract/organization/create-organization.contract";
import { OrganizationMembershipWriteRepository } from "@modules/organizations/infraestructure/persistence/repository/organization-membership/write";
import { OrganizationWriteRepository } from "@modules/organizations/infraestructure/persistence/repository/organization/write";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { inject, injectable } from "tsyringe";

type CreateOrganizationUseCaseInput = CreateOrganizationInput & { userId: string };

@injectable()
export class CreateOrganizationUseCase
  implements UseCaseInterface<CreateOrganizationUseCaseInput, Organization>
{
  constructor(
    @inject(OrganizationWriteRepository)
    private readonly organizationWriteRepository: IOrganizationWriteRepository,

    @inject(OrganizationMembershipWriteRepository)
    private readonly organizationMembershipWriteRepository: OrganizationMembershipWriteRepository,
  ) {}

  async execute(data: CreateOrganizationUseCaseInput): Promise<Organization> {
    const organization = Organization.create(data);

    await this.organizationWriteRepository.create(organization);

    const ownerMembership = OrganizationMembership.create({
      userId: data.userId,
      organizationId: organization.getId(),
      role: "owner",
    });

    await this.organizationMembershipWriteRepository.create(ownerMembership);

    return organization;
  }
}
