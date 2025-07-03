import type { DomainEvent } from "@core/domain/event/domain-event";
import type { EventHandler } from "@core/domain/event/event-handler";

// @shared/domain/event/event-subscriber.interface.ts
export interface EventSubscriberInterface {
  getName(): string;

  /**
   * Maps event names to their associated handler classes
   * Example:
   *   { 'core.user_created': [UserCreatedHandler] }
   */
  subscribedTo(): Record<string, (new () => EventHandler<DomainEvent>)[]>;
}
