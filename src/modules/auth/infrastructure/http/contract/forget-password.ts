import { registry } from "@shared/infrastructure/http/docs/openapi-registry";
import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.string(),
});

export const resetPasswordSchema = z.object({
  code: z.string(),
  password: z.string(),
});

registry.register("ForgetPassword", forgetPasswordSchema);

registry.register("ResetPassword", resetPasswordSchema);

export type ForgetPasswordInput = z.infer<typeof forgetPasswordSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
