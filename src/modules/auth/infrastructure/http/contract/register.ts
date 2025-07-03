import { UserAttributesSchema } from "@modules/user/domain/interface/user";
import type { z } from "zod";

export const RegisterSchema = UserAttributesSchema.pick({
  email: true,
  phone: true,
  name: true,
  password: true,
}).openapi("Register");

export type RegisterInput = z.infer<typeof RegisterSchema>;
