import type { LoginResponse } from "@modules/auth/infraestructure/http/contract/login";
import type { VerifyEmailInput } from "@modules/auth/infraestructure/http/contract/verify-email";
import { UserReadRepository } from "@modules/user/infraestructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infraestructure/persistence/repository/write";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { EventDispatcher } from "@shared/infraestructure/event/event-dispatcher";
import { JwtService } from "@shared/security/jwt-service";
import { inject, injectable } from "tsyringe";

@injectable()
export class VerifyEmailUseCase implements UseCaseInterface<VerifyEmailInput, LoginResponse> {
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

  async execute(data: VerifyEmailInput): Promise<LoginResponse> {
    const user = await this.userReadRepository.getUserByEmail(data.email);

    if (!user) {
      throw new Error("user_not_found");
    }

    if (user.getVerified()) {
      throw new Error("already_verified");
    }

    if (user.getVerifyCode() !== data.code) {
      throw new Error("invalid_code");
    }

    user.validateAccount();

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
