import { inject, injectable } from "tsyringe";

import type { User } from "@modules/user/domain/entity/user";
import type { IUserReadRepository } from "@modules/user/domain/interface/repository";
import { UserReadRepository } from "@modules/user/infraestructure/persistence/repository/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";

@injectable()
export class UserGetUseCase implements UseCaseInterface<unknown, User> {
  constructor(@inject(UserReadRepository) private repository: IUserReadRepository) {}

  async execute(userUuid: string): Promise<User> {
    const user = await this.repository.getByUserId(userUuid);

    if (!user) {
      throw new Error("user_not_found");
    }

    return user;
  }
}
