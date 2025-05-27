import { Ticket } from "@modules/customer-service/domain/entity/ticket";
import type { Ticket as PrismaTicket } from "@prisma/client";

export const TicketMapper = {
  toDomain(ticket: PrismaTicket): Ticket {
    return new Ticket({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      createdAt: ticket.created_at,
      userId: ticket.user_id ?? undefined,
      attachments: ticket.attachments,
    });
  },

  toPersistence(ticket: Ticket): PrismaTicket {
    return {
      id: ticket.getId(),
      title: ticket.getTitle(),
      description: ticket.getDescription(),
      priority: ticket.getPriority(),
      created_at: ticket.getCreatedAt(),
      user_id: ticket.getUserId() ?? null,
      attachments: ticket.getAttachments() ?? [],
    };
  },
};
