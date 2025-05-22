import type { LoginInput, LoginResponse } from "@modules/auth/infraestructure/http/contract/login";
import { PasswordService } from "@modules/auth/service/password-service";
import { UserReadRepository } from "@modules/user/infraestructure/persistence/repository/read";
import { JwtService } from "@shared/security/jwt-service";
import { inject, injectable } from "tsyringe";
import { type IUseCase, Result } from "types-ddd";

@injectable()
export class LoginUserCase implements IUseCase<LoginInput, Result<LoginResponse, string>> {
  constructor(
    @inject(UserReadRepository)
    private userReadRepository: UserReadRepository,

    @inject(JwtService)
    private jwtService: JwtService,

    @inject(PasswordService)
    private passwordService: PasswordService,
  ) {}

  async execute(data: LoginInput): Promise<Result<LoginResponse, string>> {
    const user = await this.userReadRepository.getUserByEmail(data.email);

    if (!user) return Result.fail("user_not_found", "User not found");

    const compare = this.passwordService.compare(data.password, user.getPassword());

    if (!compare) return Result.fail("invalid_credentials", "Invalid credentials");

    const token = this.jwtService.generateToken({ email: user.getEmail() }, user.getId().value());

    const userObject = user.toSafeObject();

    return Result.Ok({
      token,
      user: userObject,
    });
  }
}
