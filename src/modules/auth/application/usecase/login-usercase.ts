import type { LoginInput, LoginResponse } from "@modules/auth/infrastructure/http/contract/login";
import { PasswordService } from "@modules/auth/service/password-service";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { UnauthorizedError } from "@shared/infrastructure/error";
import { JwtService } from "@shared/security/jwt-service";
import { inject, injectable } from "tsyringe";

@injectable()
export class LoginUserCase implements UseCaseInterface<LoginInput, LoginResponse> {
  constructor(
    @inject(UserReadRepository)
    private userReadRepository: UserReadRepository,

    @inject(JwtService)
    private jwtService: JwtService,

    @inject(PasswordService)
    private passwordService: PasswordService,
  ) {}

  async execute(data: LoginInput): Promise<LoginResponse> {
    const user = await this.userReadRepository.getUserByEmail(data.email);

    if (!user) {
      throw new Error("user_not_found");
    }

    const compare = this.passwordService.compare(data.password, user.getPassword());

    if (!compare) {
      throw new UnauthorizedError("invalid_credentials");
    }

    const token = this.jwtService.generateToken(
      { email: user.getEmail(), roles: user.getRoles() },
      user.getId(),
    );

    const userObject = user.toSafeObject();

    return {
      token,
      user: userObject,
    };
  }
}
