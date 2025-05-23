import type { ForgetPasswordInput } from "@modules/auth/infrastructure/http/contract/forget-password";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infrastructure/persistence/repository/write";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { EventDispatcher } from "@shared/infrastructure/event/event-dispatcher";
import { inject, injectable } from "tsyringe";

@injectable()
export class ForgetPasswordUseCase implements UseCaseInterface<ForgetPasswordInput, void> {
  constructor(
    @inject(UserReadRepository)
    private userReadRepository: UserReadRepository,

    @inject(UserWriteRepository)
    private userWriteRepository: UserWriteRepository,

    @inject(EventDispatcher)
    private eventDispatcher: EventDispatcher,
  ) {}

  async execute(data: ForgetPasswordInput): Promise<void> {
    const user = await this.userReadRepository.getUserByEmailOrThrow(data.email);

    if (!user.getVerified()) {
      throw new Error("not_verified");
      // return Result.fail("not_verified", "User not verified");
    }

    user.forgotPassword();

    await this.userWriteRepository.update(user);

    for (const event of user.getEvents()) {
      this.eventDispatcher.dispatch(event);
    }
  }
}
