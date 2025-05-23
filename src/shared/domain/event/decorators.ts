import type { DomainEvent } from "@core/domain/event/domain-event";
import type { EventHandler } from "@core/domain/event/event-handler";
import type { Constructor } from "@shared/types/constructor";

type EventHandlerClass = Constructor<EventHandler<DomainEvent>>;

const handlerRegistry = new Map<string, EventHandlerClass[]>();

export function SubscribeTo(eventName: string): ClassDecorator {
  return (target: unknown) => {
    if (!handlerRegistry.has(eventName)) {
      handlerRegistry.set(eventName, []);
    }

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    handlerRegistry.get(eventName)!.push(target as EventHandlerClass);
  };
}

export function getAllDecoratedHandlers(): Map<string, EventHandlerClass[]> {
  return handlerRegistry;
}

export function getHandlerNamesFor(eventName: string): string[] {
  const classes = handlerRegistry.get(eventName) || [];
  return classes.map((cls) => (cls as EventHandlerClass).name); // You may improve this with metadata
}
