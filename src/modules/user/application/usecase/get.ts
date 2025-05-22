import { inject, injectable } from "tsyringe";
import { type IUseCase, Result } from "types-ddd";

import type { User } from "@modules/user/domain/entity/user";
import { UserCreated } from "@modules/user/domain/event/user-created";
import type { IUserReadRepository } from "@modules/user/domain/interface/repository";
import { UserReadRepository } from "@modules/user/infraestructure/persistence/repository/read";
import { EventDispatcher } from "@shared/infraestructure/event/domain-event.dispatcher";

@injectable()
export class UserGetUseCase implements IUseCase<unknown, Result<User, string>> {
  constructor(
    @inject(UserReadRepository) private repository: IUserReadRepository,
    @inject(EventDispatcher) private eventDispatcher: EventDispatcher,
  ) {}

  async execute(userUuid: string): Promise<Result<User, string>> {
    const user = await this.repository.getByUserId(userUuid);

    if (!user) return Result.fail("user_not_found", "User not found");

    user.registerEvent(new UserCreated(user.id.value(), user.getEmail()));

    this.eventDispatcher.dispatchEvents(user);

    return Result.Ok(user);
  }
}
