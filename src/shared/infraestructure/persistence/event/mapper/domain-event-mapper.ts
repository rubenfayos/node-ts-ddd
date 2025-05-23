import type { Prisma, Event as PrismaDomainEvent } from "@prisma/client";
import { EventSubscriptionStatus } from "@shared/domain/enum/event-subscription-status.enum";
import { Event as DomainEvent } from "@shared/domain/event/event";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class EventMapper {
  static toPersistence(domain: DomainEvent, handlerNames: string[]): Prisma.EventCreateInput {
    return {
      id: domain.getId(),
      type: domain.getType(),
      related_id: domain.getRelatedId(),
      root: domain.getRoot(),
      user: domain.getUserId() ? { connect: { id: domain.getUserId() } } : undefined,
      stream: domain.getStream(),
      occurred_at: domain.getOccurredAt(),
      data: domain.getData() as Prisma.InputJsonValue,
      subscriptions: {
        create: handlerNames.map((name) => ({
          status: EventSubscriptionStatus.PENDING,
          handler_name: name,
        })),
      },
    };
  }

  static toDomain(raw: PrismaDomainEvent): DomainEvent {
    return new DomainEvent({
      type: raw.type,
      relatedId: raw.related_id,
      userId: raw.user_id ?? undefined,
      source: raw.stream ?? undefined,
      occurredAt: raw.occurred_at,
      data: (raw.data as object) ?? {},
      id: raw.id,
      stream: raw.stream ?? undefined,
    });
  }
}
