import type { IMembershipReadRepository } from "@modules/organizations/domain/interface/organization-membership-repository";
import { OrganizationMembershipReadRepository } from "@modules/organizations/infraestructure/persistence/repository/organization-membership/read";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { inject, injectable } from "tsyringe";
import type { OrganizationMembership } from "@modules/organizations/domain/entity/organization-membership";

type GetOrganizationMembershipUseCaseInput = {
  organizationId: string;
  userId: string;
};

@injectable()
export class GetOrganizationMembershipUseCase
  implements UseCaseInterface<GetOrganizationMembershipUseCaseInput, OrganizationMembership>
{
  constructor(
    @inject(OrganizationMembershipReadRepository)
    private readonly organizationMembershipReadRepository: IMembershipReadRepository,

    @inject(UserReadRepository)
    private readonly userReadRepository: UserReadRepository,
  ) {}

  async execute(data: GetOrganizationMembershipUseCaseInput): Promise<OrganizationMembership> {
    const membership = await this.organizationMembershipReadRepository.getByUserAndOrganization(
      data.userId,
      data.organizationId,
    );

    if (!membership) throw new Error("Membership not found");

    return membership;
  }
}
