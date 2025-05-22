import { User } from "@modules/user/domain/entity/user";
import type { IUserCreateRepository } from "@modules/user/domain/interface/repository";
import { UserReadRepository } from "@modules/user/infraestructure/persistence/repository/read";
import { UserWriteRepository } from "@modules/user/infraestructure/persistence/repository/write";
import { EventDispatcher } from "@shared/infraestructure/event/domain-event.dispatcher";
import { inject, injectable } from "tsyringe";
import { type IUseCase, Result } from "types-ddd";
import type { CreateUserDTO } from "../dto/create-user-dto";

@injectable()
export class UserCreateUseCase implements IUseCase<CreateUserDTO, Result<User, string>> {
  constructor(
    @inject(UserReadRepository)
    private userReadRepository: UserReadRepository,

    @inject(UserWriteRepository)
    private userWriteRepository: IUserCreateRepository,

    @inject(EventDispatcher)
    private eventDispatcher: EventDispatcher,
  ) {}

  async execute(data: CreateUserDTO): Promise<Result<User, string>> {
    const existingUser = await this.userReadRepository.getUserByEmail(data.email);

    if (existingUser) {
      return Result.fail("duplicate_user", "A user with that email and phone already exists");
    }

    const user = User.register(data).value();

    const result = this.userWriteRepository.create(user);

    this.eventDispatcher.dispatchEvents(user);

    return result;
  }
}
