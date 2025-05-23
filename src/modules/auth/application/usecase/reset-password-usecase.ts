import type { ResetPasswordInput } from "@modules/auth/infrastructure/http/contract/forget-password";
import type { LoginResponse } from "@modules/auth/infrastructure/http/contract/login";
import { PasswordService } from "@modules/auth/service/password-service";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infrastructure/persistence/repository/write";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { EventDispatcher } from "@shared/infrastructure/event/event-dispatcher";
import { JwtService } from "@shared/security/jwt-service";
import { inject, injectable } from "tsyringe";

@injectable()
export class ResetPasswordUseCase implements UseCaseInterface<ResetPasswordInput, LoginResponse> {
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

  async execute(data: ResetPasswordInput): Promise<LoginResponse> {
    const user = await this.userReadRepository.getUserByVerifyCode(data.code);

    if (!user) {
      throw new Error("user_not_found");
    }

    const newPassword = this.passwordService.hash(data.password);

    user.resetPassword(newPassword);

    await this.userWriteRepository.update(user);

    const token = this.jwtService.generateToken({ email: user.getEmail() }, user.getId());

    for (const events of user.getEvents()) {
      this.eventDispatcher.dispatch(events);
    }

    const userObject = user.toSafeObject();

    return {
      token,
      user: userObject,
    };
  }
}
