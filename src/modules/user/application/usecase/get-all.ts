import { inject, injectable } from "tsyringe";
import type { IUseCase } from "types-ddd";

import type { User } from "@modules/user/domain/entity/user";
import type { IUserReadRepository } from "@modules/user/domain/interface/repository";
import { UserReadRepository } from "@modules/user/infraestructure/persistence/repository/read";

@injectable()
export class UserGetAllUseCase implements IUseCase<unknown, User[]> {
  constructor(@inject(UserReadRepository) private repository: IUserReadRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.repository.getAll();
    return users;
  }
}
