// @shared/domain/event/event-subscriber.interface.ts
import type { DomainEvent } from "./domain-event";
import type { EventHandler } from "./event-handler";

export interface EventSubscriberInterface {
  getName(): string;

  /**
   * Maps event names to their associated handler classes
   * Example:
   *   { 'core.user_created': [UserCreatedHandler] }
   */
  subscribedTo(): Record<string, (new () => EventHandler<DomainEvent>)[]>;
}
