import type { IMembershipReadRepository } from "@modules/organizations/domain/interface/organization-membership-repository";
import type { DeleteOrganizationMembershipInput } from "@modules/organizations/infraestructure/http/contract/organization-membership/delete-organization-membership.contract";
import { OrganizationMembershipReadRepository } from "@modules/organizations/infraestructure/persistence/repository/organization-membership/read";
import { OrganizationMembershipWriteRepository } from "@modules/organizations/infraestructure/persistence/repository/organization-membership/write";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteOrganizationMembershipUseCase
  implements UseCaseInterface<DeleteOrganizationMembershipInput, void>
{
  constructor(
    @inject(UserReadRepository)
    private readonly userReadRepository: UserReadRepository,

    @inject(OrganizationMembershipReadRepository)
    private readonly organizationMembershipReadRepository: IMembershipReadRepository,

    @inject(OrganizationMembershipWriteRepository)
    private readonly organizationMembershipWriteRepository: OrganizationMembershipWriteRepository,
  ) {}

  async execute(data: DeleteOrganizationMembershipInput): Promise<void> {
    const membership = await this.organizationMembershipReadRepository.getById(data.membershipId);

    if (!membership) throw new Error("membership not found");

    await this.organizationMembershipWriteRepository.delete(membership.getId());
  }
}
