import { UserAttributesSchema } from "@modules/user/domain/interface/user";
import { registry } from "@shared/infraestructure/http/docs/openapi-registry";
import { z } from "zod";

export const GetAllResponseSchema = z
  .object({
    users: z.array(
      UserAttributesSchema.pick({
        id: true,
        email: true,
        phone: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .openapi("GetAllResponse");

registry.register("GetAllResponse", GetAllResponseSchema);

export type GetAllResponse = z.infer<typeof GetAllResponseSchema>;
