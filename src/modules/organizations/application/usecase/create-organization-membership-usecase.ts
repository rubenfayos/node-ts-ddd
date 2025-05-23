import { OrganizationMembership } from "@modules/organizations/domain/entity/organization-membership";
import type { IMembershipReadRepository } from "@modules/organizations/domain/interface/organization-membership-repository";
import type { IOrganizationReadRepository } from "@modules/organizations/domain/interface/organization-repository";
import type { CreateOrganizationMembershipInput } from "@modules/organizations/infraestructure/http/contract/organization-membership/create-organization-membership.contract";
import { OrganizationMembershipReadRepository } from "@modules/organizations/infraestructure/persistence/repository/organization-membership/read";
import { OrganizationMembershipWriteRepository } from "@modules/organizations/infraestructure/persistence/repository/organization-membership/write";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { inject, injectable } from "tsyringe";

type CreateOrganizationMembershipUseCaseInput = CreateOrganizationMembershipInput & {
  organizationId: string;
};

@injectable()
export class CreateOrganizationMembershipUseCase
  implements UseCaseInterface<CreateOrganizationMembershipUseCaseInput, OrganizationMembership>
{
  constructor(
    @inject(UserReadRepository)
    private readonly userReadRepository: UserReadRepository,

    @inject(OrganizationMembershipReadRepository)
    private readonly organizationMembershipReadRepository: IMembershipReadRepository,

    @inject(OrganizationMembershipWriteRepository)
    private readonly organizationMembershipWriteRepository: OrganizationMembershipWriteRepository,
  ) {}

  async execute(data: CreateOrganizationMembershipUseCaseInput): Promise<OrganizationMembership> {
    const user = await this.userReadRepository.getByUserId(data.user);

    if (!user) throw new Error("User not found");

    const membership = await this.organizationMembershipReadRepository.getByUserAndOrganization(
      user.getId(),
      data.organizationId,
    );

    if (membership) throw new Error("Membership already exists");

    const organizationMembership = OrganizationMembership.create({
      userId: user.getId(),
      organizationId: data.organizationId,
      role: data.role,
    });

    await this.organizationMembershipWriteRepository.create(organizationMembership);

    return organizationMembership;
  }
}
