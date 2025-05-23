import { getAllDecoratedHandlers } from "@shared/domain/event/decorators";
import type { DomainEvent } from "@shared/domain/event/domain-event";
import type { EventHandler } from "@shared/domain/event/event-handler";
import { EventSubscription } from "@shared/domain/event/event-subscription";
import { useLogger } from "@shared/packages/logger";
import amqp from "amqplib";
import { container } from "tsyringe";
import { EventWriteRepository } from "../persistence/event/repostory/write";
import Config from "@config";

export async function startEventListener() {
  const logger = useLogger("RabbitMQ Listener");

  const conn = await amqp.connect(Config.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertExchange("events_exchange", "topic", { durable: true });

  const repo = container.resolve(EventWriteRepository);

  const queue = await channel.assertQueue(Config.RABBITMQ_QUEUE, {
    durable: true,
  });

  const subscriptions = getAllDecoratedHandlers();

  // Bind each event topic to the queue
  for (const eventName of subscriptions.keys()) {
    await channel.bindQueue(queue.queue, "events_exchange", eventName);
  }

  channel.consume(queue.queue, async (msg) => {
    if (!msg) return;

    logger.log(`Received event: ${msg.fields.routingKey}`);

    try {
      const raw = JSON.parse(msg.content.toString());

      const eventName = raw.name;

      const handlers = subscriptions.get(eventName) || [];

      for (const Handler of handlers) {
        try {
          const handlerInstance = container.resolve<EventHandler<DomainEvent>>(Handler);
          const event = Object.assign({ getName: () => eventName }, raw) as DomainEvent;
          await handlerInstance.handle(event);

          const subscription = EventSubscription.create({
            eventId: raw.eventId,
            handlerName: Handler.name,
          });

          subscription.complete();

          await repo.updateSubscription(subscription);
        } catch (e) {}
      }

      channel.ack(msg);
    } catch (err) {
      console.error("Error handling event", err);
      channel.nack(msg);
    }
  });

  logger.log("Listener started");
}
