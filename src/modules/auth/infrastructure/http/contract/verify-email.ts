import { registry } from "@shared/infrastructure/http/docs/openapi-registry";
import { z } from "zod";

export const verifyEmailSchema = z.object({
  code: z.string(),
  email: z.string(),
});

registry.register("VerifyEmail", verifyEmailSchema);

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
