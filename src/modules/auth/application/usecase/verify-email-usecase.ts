import type { LoginResponse } from "@modules/auth/infraestructure/http/contract/login";
import type { VerifyEmailInput } from "@modules/auth/infraestructure/http/contract/verify-email";
import { UserReadRepository } from "@modules/user/infraestructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infraestructure/persistence/repository/write";
import { EventDispatcher } from "@shared/infraestructure/event/domain-event.dispatcher";
import { JwtService } from "@shared/security/jwt-service";
import { inject, injectable } from "tsyringe";
import { type IUseCase, Result } from "types-ddd";

@injectable()
export class VerifyEmailUseCase
  implements IUseCase<VerifyEmailInput, Result<LoginResponse, string>>
{
  constructor(
    @inject(UserReadRepository)
    private userReadRepository: UserReadRepository,

    @inject(UserWriteRepository)
    private userWriteRepository: UserWriteRepository,

    @inject(JwtService)
    private jwtService: JwtService,

    @inject(EventDispatcher)
    private eventDispatcher: EventDispatcher,
  ) {}

  async execute(data: VerifyEmailInput): Promise<Result<LoginResponse, string>> {
    const user = await this.userReadRepository.getUserByEmail(data.email);

    if (!user) return Result.fail("user_not_found", "User not found");

    if (user.getVerified()) {
      return Result.fail("already_verified", "User already verified");
    }

    if (user.getVerifyCode() !== data.code) {
      return Result.fail("invalid_code", "Invalid code");
    }

    user.validateAccount();

    await this.userWriteRepository.update(user);

    const token = this.jwtService.generateToken({ email: user.getEmail() }, user.getId().value());

    this.eventDispatcher.dispatchEvents(user);

    const userObject = user.toSafeObject();

    return Result.Ok({
      token,
      user: userObject,
    });
  }
}
