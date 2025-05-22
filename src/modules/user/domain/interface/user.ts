import { registry } from "@shared/infraestructure/http/docs/openapi-registry";
import { z } from "zod";

export const UserAttributesSchema = z
  .object({
    id: z.string().uuid(),
    email: z.string({ required_error: "Email is required" }).email("Not a valid email"),
    password: z.string().min(6, { message: "Password must be 6 or more characters" }),
    name: z.string().nullish(),
    phone: z.string().nullish(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    verified: z.boolean(),
    verifiedAt: z.string().datetime(),
    verifyCode: z.string(),
  })
  .openapi("User");

registry.register("User", UserAttributesSchema);

export interface IUserAttributes extends z.infer<typeof UserAttributesSchema> {}

export enum UserTypes {
  ADMIN = "admin",
  CUSTOMER = "customer",
}
