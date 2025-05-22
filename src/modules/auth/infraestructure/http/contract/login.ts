import { UserAttributesSchema } from "@modules/user/domain/interface/user";
import { registry } from "@shared/infraestructure/http/docs/openapi-registry";
import { z } from "zod";

export const LoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .openapi("Login");

registry.register("Login", LoginSchema);

export type LoginInput = z.infer<typeof LoginSchema>;

export const LoginResponseSchema = z
  .object({
    token: z.string(),
    user: UserAttributesSchema.pick({
      id: true,
      email: true,
      phone: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      verified: true,
    }),
  })
  .openapi("LoginResponse");

registry.register("LoginResponse", LoginResponseSchema);

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
