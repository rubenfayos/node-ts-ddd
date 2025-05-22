import type { ForgetPasswordInput } from "@modules/auth/infraestructure/http/contract/forget-password";
import { UserReadRepository } from "@modules/user/infraestructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infraestructure/persistence/repository/write";
import { EventDispatcher } from "@shared/infraestructure/event/domain-event.dispatcher";
import { inject, injectable } from "tsyringe";
import { type IUseCase, Result } from "types-ddd";

@injectable()
export class ForgetPasswordUseCase implements IUseCase<ForgetPasswordInput, Result<null>> {
  constructor(
    @inject(UserReadRepository)
    private userReadRepository: UserReadRepository,

    @inject(UserWriteRepository)
    private userWriteRepository: UserWriteRepository,

    @inject(EventDispatcher)
    private eventDispatcher: EventDispatcher,
  ) {}

  async execute(data: ForgetPasswordInput): Promise<Result<null>> {
    const user = await this.userReadRepository.getUserByEmailOrThrow(data.email);

    if (!user.getVerified()) {
      return Result.fail("not_verified", "User not verified");
    }

    user.forgotPassword();

    await this.userWriteRepository.update(user);

    this.eventDispatcher.dispatchEvents(user);

    return Result.Ok(null);
  }
}
