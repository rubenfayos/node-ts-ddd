import { UserAttributesSchema } from "@modules/user/domain/interface/user";
import { timelineEventSchema } from "@shared/application/contract/timeline-event.schema";
import { z } from "zod";

const userBaseSchema = UserAttributesSchema.pick({
  id: true,
  email: true,
  name: true,
  phone: true,
  createdAt: true,
  verified: true,
});

export const getUserResponseSchema = userBaseSchema.extend({
  timeline: z.array(timelineEventSchema),
});

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;
