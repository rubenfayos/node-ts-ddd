import { User } from "@modules/user/domain/entity/user";
import { DomainEvent } from "@shared/domain/event/domain-event";

export class UserForgotPasswordEvent extends DomainEvent {
  static readonly EVENT_NAME = "user.forgot_password";
  version = 0;

  public static create(userId: string): UserForgotPasswordEvent {
    return new UserForgotPasswordEvent(userId);
  }

  getRelatedFQN(): string {
    return User.name;
  }

  public getName(): string {
    return UserForgotPasswordEvent.EVENT_NAME;
  }
}
