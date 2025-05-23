// shared/infraestructure/event/EventPublisher.ts
import Config from "@config";
import type { DomainEvent } from "@shared/domain/event/domain-event";
import {useLogger} from "@shared/packages/logger";
import amqp from "amqplib";
import { singleton } from "tsyringe";

@singleton()
export class EventPublisher {

  private logger = useLogger("RabbitMQ Publisher");

  private channel!: amqp.Channel;

  async connect(): Promise<void> {
    const conn = await amqp.connect(Config.RABBITMQ_URL);
    this.channel = await conn.createChannel();
    await this.channel.assertExchange("events_exchange", "topic", { durable: true });
    this.logger.log("Publisher connected to RabbitMQ");
  }

  async publish(event: DomainEvent, eventId?: string): Promise<void> {
    const routingKey = event.getName();

    const payload = JSON.stringify({
      name: event.getName(),
      occurredAt: event.occurredAt,
      relatedId: event.relatedId,
      userId: event.userId,
      source: event.source,
      eventId,
    });

    this.channel.publish("events_exchange", routingKey, Buffer.from(payload), {
      persistent: true,
    });

    this.logger.log(`Published event: ${event.getName()}`);
  }
}
