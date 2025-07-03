import { DomainEvent } from "@core/domain/event/domain-event";
import { User } from "@modules/user/domain/entity/user";

export class UserCreated extends DomainEvent {
  static readonly EVENT_NAME = "user.created";
  version = 0;

  public static create(userId: string): UserCreated {
    const event = new UserCreated(userId);

    event.stream = `user:${userId}`;

    return event;
  }

  public getRelatedFQN(): string {
    return User.name;
  }

  public getName(): string {
    return UserCreated.EVENT_NAME;
  }
}
