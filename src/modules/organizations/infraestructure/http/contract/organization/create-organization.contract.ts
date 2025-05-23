import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string(),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
