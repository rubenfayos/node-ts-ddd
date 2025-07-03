import { z } from "zod";

export const timelineEventSchema = z.object({
  type: z.string(),
  occurredAt: z.string(),
  relatedId: z.string(),
  data: z.record(z.any()).optional(),
  userId: z.string().optional(),
});

export type TimelineEvent = z.infer<typeof timelineEventSchema>;
