import type { LoginResponse } from "@modules/auth/infrastructure/http/contract/login";
import type { VerifyEmailInput } from "@modules/auth/infrastructure/http/contract/verify-email";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infrastructure/persistence/repository/write";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { NotFoundError, ValidationError } from "@shared/infrastructure/error";
import { ConflictError } from "@shared/infrastructure/error/conflict";
import { EventDispatcher } from "@shared/infrastructure/event/event-dispatcher";
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
      throw new NotFoundError("user_not_found");
    }

    if (user.getVerified()) {
      throw new ConflictError("already_verified");
    }

    if (user.getVerifyCode() !== data.code) {
      throw new ValidationError("invalid_code");
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
