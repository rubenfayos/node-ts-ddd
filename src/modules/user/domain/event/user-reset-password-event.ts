import {DomainEvent} from "@core/domain/event/domain-event";
import { User } from "@modules/user/domain/entity/user";

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
