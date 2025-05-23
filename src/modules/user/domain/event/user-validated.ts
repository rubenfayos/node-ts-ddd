import { User } from "@modules/user/domain/entity/user";
import { DomainEvent } from "@shared/domain/event/domain-event";

export class UserValidated extends DomainEvent {
  static readonly EVENT_NAME = "user.validated";
  version = 0;

  public static create(userId: string): UserValidated {
    return new UserValidated(userId);
  }

  public getRelatedFQN(): string {
    return User.name;
  }

  public getName(): string {
    return UserValidated.EVENT_NAME;
  }
}
