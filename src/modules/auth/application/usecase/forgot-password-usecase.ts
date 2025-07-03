import type { ForgotPasswordInput } from "@modules/auth/infrastructure/http/contract/forgot-password";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infrastructure/persistence/repository/write";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { ConflictError } from "@shared/infrastructure/error";
import { EventDispatcher } from "@shared/infrastructure/event/event-dispatcher";
import { inject, injectable } from "tsyringe";

@injectable()
export class ForgotPasswordUseCase implements UseCaseInterface<ForgotPasswordInput, void> {
  constructor(
    @inject(UserReadRepository)
    private userReadRepository: UserReadRepository,

    @inject(UserWriteRepository)
    private userWriteRepository: UserWriteRepository,

    @inject(EventDispatcher)
    private eventDispatcher: EventDispatcher,
  ) {}

  async execute(data: ForgotPasswordInput): Promise<void> {
    const user = await this.userReadRepository.getUserByEmailOrThrow(data.email);

    if (!user.getVerified()) {
      throw new ConflictError("not_verified");
    }

    user.forgotPassword();

    await this.userWriteRepository.update(user);

    for (const event of user.getEvents()) {
      this.eventDispatcher.dispatch(event);
    }
  }
}
