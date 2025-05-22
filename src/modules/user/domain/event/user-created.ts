import { User } from "@modules/user/domain/entity/user";
import { DomainEvent } from "@shared/domain/event/domain-event";

export class UserCreated extends DomainEvent<User> {
  static readonly NAME = "core.user_created";
  $names = UserCreated.NAME;
  $version = 0;

  constructor(
    userId: string,
    public readonly email: string,
  ) {
    super(userId, {
      userId,
      source: "UserService",
    });
  }

  async handle(aggregate: User) {
    const model = aggregate.toObject();
    console.log("User Added", model);
  }

  getRelatedFQN(): string {
    return User.name;
  }
}
