import { User } from "@modules/user/domain/entity/user";
import { DomainEvent } from "@shared/domain/event/domain-event";

export class UserResetPasswordEvent extends DomainEvent<User> {
  static readonly NAME = "user.reset_password";
  $names = UserResetPasswordEvent.NAME;
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
    console.log("User Reset Password", model);
  }

  getRelatedFQN(): string {
    return User.name;
  }
}
