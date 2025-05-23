import { DomainEvent } from "@core/domain/event/domain-event";
import { User } from "../entity/user";

export class UserUpdatedEvent extends DomainEvent {
  static readonly EVENT_NAME = "user.validated";
  version = 0;

  public static create(userId: string): UserUpdatedEvent {
    const event = new UserUpdatedEvent(userId);

    event.stream = `user:${userId}`;

    return event;
  }

  public getRelatedFQN(): string {
    return User.name;
  }
  public getName(): string {
    return UserUpdatedEvent.EVENT_NAME;
  }
}
