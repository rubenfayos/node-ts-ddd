import type { IMembershipReadRepository } from "@modules/organizations/domain/interface/organization-membership-repository";
import { OrganizationMembershipReadRepository } from "@modules/organizations/infraestructure/persistence/repository/organization-membership/read";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { inject, injectable } from "tsyringe";
import type { OrganizationMembershipDto } from "../dto/organization-membership-dto";
import type { PaginatedResult } from "@shared/common/utils/prisma-utils";

type GetOrganizationMembershipsUseCaseInput = {
  organizationId: string;
  query: Record<string, string>;
};

@injectable()
export class GetOrganizationMembershipsUseCase
  implements
    UseCaseInterface<
      GetOrganizationMembershipsUseCaseInput,
      PaginatedResult<OrganizationMembershipDto>
    >
{
  constructor(
    @inject(OrganizationMembershipReadRepository)
    private readonly organizationMembershipReadRepository: IMembershipReadRepository,

    @inject(UserReadRepository)
    private readonly userReadRepository: UserReadRepository,
  ) {}

  async execute(
    data: GetOrganizationMembershipsUseCaseInput,
  ): Promise<PaginatedResult<OrganizationMembershipDto>> {
    const memberships = await this.organizationMembershipReadRepository.getByOrganization(
      data.organizationId,
      { where: data.query },
    );

    const dtos: OrganizationMembershipDto[] = [];

    for (const membership of memberships.items) {
      const user = await this.userReadRepository.getByUserId(membership.getUserId());

      if (!user) throw new Error("User not found");

      const dto = {
        role: membership.getRole(),
        user: {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
        },
      };

      dtos.push(dto);
    }

    return { ...memberships, items: dtos };
  }
}
