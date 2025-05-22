import type { Prisma, Event as PrismaDomainEvent } from "@prisma/client";
import { Event as DomainEvent } from "@shared/domain/event/event";

export class EventMapper {
  static toPersistence(domain: DomainEvent): Prisma.EventCreateInput {
    return {
      id: domain.id.value(),
      type: domain.type,
      related_id: domain.relatedId,
      root: domain.root,
      user: domain.userId ? { connect: { id: domain.userId } } : undefined,
      stream: domain.source ?? "null",
      occurred_at: domain.occurredAt,
      data: domain.payload as Prisma.InputJsonValue,
      updated_at: domain.occurredAt,
    };
  }

  static toDomain(raw: PrismaDomainEvent): DomainEvent {
    return new DomainEvent({
      type: raw.type,
      relatedId: raw.related_id,
      userId: raw.user_id ?? undefined,
      source: raw.stream ?? undefined,
      occurredAt: raw.occurred_at,
      payload: raw.data,
    });
  }
}
