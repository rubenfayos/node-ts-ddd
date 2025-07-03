import type { IOrganizationReadRepository } from "@modules/organizations/domain/interface/organization-repository";
import { OrganizationMembershipReadRepository } from "@modules/organizations/infraestructure/persistence/repository/organization-membership/read";
import { OrganizationReadRepository } from "@modules/organizations/infraestructure/persistence/repository/organization/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { NotFoundError, UnauthorizedError } from "@shared/infrastructure/error";
import { EventReadRepository } from "@shared/infrastructure/persistence/event/repostory/read";
import { inject, injectable } from "tsyringe";

type GetOrganizationUseCaseInput = {
  userId: string;
  organizationId: string;
};

@injectable()
export class GetOrganizationUseCase implements UseCaseInterface<GetOrganizationUseCaseInput, any> {
  constructor(
    @inject(OrganizationMembershipReadRepository)
    private readonly organizationMembershipReadRepository: OrganizationMembershipReadRepository,

    @inject(OrganizationReadRepository)
    private readonly organizationReadRepository: IOrganizationReadRepository,

    @inject(EventReadRepository)
    private readonly eventReadRepository: EventReadRepository,
  ) {}

  async execute(data: GetOrganizationUseCaseInput): Promise<any> {
    const organization = await this.organizationReadRepository.getById(data.organizationId);

    if (!organization) throw new NotFoundError("Organization not found");

    const membership = await this.organizationMembershipReadRepository.getByUserAndOrganization(
      data.userId,
      organization.getId(),
    );

    if (!membership) throw new UnauthorizedError("Membership not found");

    const events = await this.eventReadRepository.getByStream(
      `organization:${organization.getId()}`,
    );

    const dto = {
      ...organization,
      timeline: events.map((event) => event.toTimeline()),
    };

    return dto;
  }
}
