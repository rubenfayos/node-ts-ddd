import { inject, injectable } from "tsyringe";

import type { IUserReadRepository } from "@modules/user/domain/interface/repository";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { EventReadRepository } from "@shared/infrastructure/persistence/event/repostory/read";
import type { IEventReadRepository } from "@core/domain/interface/event/repository";
import { UserMapper } from "@modules/user/infrastructure/persistence/mapper/user-mapper";
import type { GetUserResponse } from "@modules/user/infrastructure/http/contract/response/get-user.response";

@injectable()
export class UserGetUseCase implements UseCaseInterface<unknown, GetUserResponse> {
  constructor(
    @inject(UserReadRepository) private repository: IUserReadRepository,
    @inject(EventReadRepository) private eventRepository: IEventReadRepository,
  ) {}

  async execute(userUuid: string): Promise<GetUserResponse> {
    const user = await this.repository.getByUserId(userUuid);

    if (!user) {
      throw new Error("user_not_found");
    }

    const timeline = await this.eventRepository.getByStream(`user:${user.getId()}`);

    const dto: GetUserResponse = {
      ...UserMapper.toResponseDTO(user),
      timeline: timeline.map((event) => event.toTimeline()),
    };

    return dto;
  }
}
