import { DomainEvent } from "@core/domain/event/domain-event";
import { User } from "@modules/user/domain/entity/user";

export class UserValidated extends DomainEvent {
  static readonly EVENT_NAME = "user.validated";
  version = 0;

  public static create(userId: string): UserValidated {
    const event = new UserValidated(userId);

    event.stream = `user:${userId}`;

    return event;
  }

  public getRelatedFQN(): string {
    return User.name;
  }

  public getName(): string {
    return UserValidated.EVENT_NAME;
  }
}
