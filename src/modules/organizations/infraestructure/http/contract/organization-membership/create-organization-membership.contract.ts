import { z } from "zod";

export const createOrganizationMembershipSchema = z.object({
  user: z.string(),
  role: z.string(),
});

export type CreateOrganizationMembershipInput = z.infer<typeof createOrganizationMembershipSchema>;
