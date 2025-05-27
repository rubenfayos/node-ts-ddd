import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  attachments: z.array(
    z.any().openapi({
      type: "string",
      format: "binary",
    }),
  ),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
