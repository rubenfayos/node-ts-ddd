import type { RegisterInput } from "@modules/auth/infraestructure/http/contract/register";
import { PasswordService } from "@modules/auth/service/password-service";
import { User } from "@modules/user/domain/entity/user";
import type { IUserCreateRepository } from "@modules/user/domain/interface/repository";
import { UserReadRepository } from "@modules/user/infraestructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infraestructure/persistence/repository/write";
import { EventDispatcher } from "@shared/infraestructure/event/domain-event.dispatcher";
import { inject, injectable } from "tsyringe";
import { type IUseCase, Result } from "types-ddd";

@injectable()
export class RegisterUserCase implements IUseCase<RegisterInput, Result<any>> {
  constructor(
    @inject(UserReadRepository)
    private userReadRepository: UserReadRepository,

    @inject(UserWriteRepository)
    private userWriteRepository: IUserCreateRepository,

    @inject(PasswordService)
    private passwordService: PasswordService,

    @inject(EventDispatcher)
    private eventDispatcher: EventDispatcher,
  ) {}

  async execute(data: RegisterInput): Promise<Result> {
    const existingUser = await this.userReadRepository.getUserByEmail(data.email);

    if (existingUser) {
      return Result.fail("duplicate_user", "A user with that email and phone already exists");
    }

    const hashedPassword = this.passwordService.hash(data.password);

    const user = User.register({ ...data, password: hashedPassword }).value();

    const result = await this.userWriteRepository.create(user);

    if (result.isFail()) {
      return Result.fail("error_creating_user", "An error occurred while creating the user");
    }

    this.eventDispatcher.dispatchEvents(user);

    return Result.Ok();
  }
}
