import { registry } from "@shared/infrastructure/http/docs/openapi-registry";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string(),
});

export const resetPasswordSchema = z.object({
  code: z.string(),
  password: z.string(),
});

registry.register("ForgotPassword", forgotPasswordSchema);

registry.register("ResetPassword", resetPasswordSchema);

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
