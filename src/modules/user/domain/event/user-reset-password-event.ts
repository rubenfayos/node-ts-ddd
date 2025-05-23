import { User } from "@modules/user/domain/entity/user";
import { DomainEvent } from "@shared/domain/event/domain-event";

export class UserResetPasswordEvent extends DomainEvent {
  static readonly EVENT_NAME = "user.reset_password";
  version = 0;

  public static create(userId: string): UserResetPasswordEvent {
    return new UserResetPasswordEvent(userId);
  }

  getRelatedFQN(): string {
    return User.name;
  }

  public getName(): string {
    return UserResetPasswordEvent.EVENT_NAME;
  }
}
