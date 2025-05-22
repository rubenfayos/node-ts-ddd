import { User } from "@modules/user/domain/entity/user";
import { DomainEvent } from "@shared/domain/event/domain-event";

export class UserForgotPasswordEvent extends DomainEvent<User> {
  static readonly NAME = "user.forgot_password";
  $names = UserForgotPasswordEvent.NAME;
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
    console.log("User Forgot Password", model);
  }

  getRelatedFQN(): string {
    return User.name;
  }
}
