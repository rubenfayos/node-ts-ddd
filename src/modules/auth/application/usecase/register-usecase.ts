import type { RegisterInput } from "@modules/auth/infrastructure/http/contract/register";
import { PasswordService } from "@modules/auth/service/password-service";
import { User } from "@modules/user/domain/entity/user";
import type { IUserCreateRepository } from "@modules/user/domain/interface/repository";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infrastructure/persistence/repository/write";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { EventDispatcher } from "@shared/infrastructure/event/event-dispatcher";
import { inject, injectable } from "tsyringe";

@injectable()
export class RegisterUserCase implements UseCaseInterface<RegisterInput, void> {
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

  async execute(data: RegisterInput): Promise<void> {
    const existingUser = await this.userReadRepository.getUserByEmail(data.email);

    if (existingUser) {
      throw new Error("duplicate_user");
      // return Result.fail("duplicate_user", "A user with that email and phone already exists");
    }

    const hashedPassword = this.passwordService.hash(data.password);

    const user = User.register({ ...data, password: hashedPassword });

    await this.userWriteRepository.create(user);

    // if (result.isFail()) {
    //   return Result.fail("error_creating_user", "An error occurred while creating the user");
    // }

    for (const events of user.getEvents()) {
      this.eventDispatcher.dispatch(events);
    }
  }
}
