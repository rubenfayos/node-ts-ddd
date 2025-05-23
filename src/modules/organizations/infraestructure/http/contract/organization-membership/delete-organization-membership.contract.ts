import { z } from "zod";

export const deleteOrganizationMembershipSchema = z.object({
  membershipId: z.string(),
  organizationId: z.string(),
});

export type DeleteOrganizationMembershipInput = z.infer<typeof deleteOrganizationMembershipSchema>;
