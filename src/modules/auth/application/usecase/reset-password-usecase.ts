import type { ResetPasswordInput } from "@modules/auth/infraestructure/http/contract/forget-password";
import type { LoginResponse } from "@modules/auth/infraestructure/http/contract/login";
import { PasswordService } from "@modules/auth/service/password-service";
import { UserReadRepository } from "@modules/user/infraestructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infraestructure/persistence/repository/write";
import { EventDispatcher } from "@shared/infraestructure/event/domain-event.dispatcher";
import { JwtService } from "@shared/security/jwt-service";
import { inject, injectable } from "tsyringe";
import { type IUseCase, Result } from "types-ddd";

@injectable()
export class ResetPasswordUseCase
  implements IUseCase<ResetPasswordInput, Result<LoginResponse, string>>
{
  constructor(
    @inject(UserReadRepository)
    private userReadRepository: UserReadRepository,

    @inject(UserWriteRepository)
    private userWriteRepository: UserWriteRepository,

    @inject(JwtService)
    private jwtService: JwtService,

    @inject(PasswordService)
    private passwordService: PasswordService,

    @inject(EventDispatcher)
    private eventDispatcher: EventDispatcher,
  ) {}

  async execute(data: ResetPasswordInput): Promise<Result<LoginResponse, string>> {
    const user = await this.userReadRepository.getUserByVerifyCode(data.code);

    if (!user) return Result.fail("user_not_found", "User not found");

    const newPassword = this.passwordService.hash(data.password);

    user.resetPassword(newPassword);

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
