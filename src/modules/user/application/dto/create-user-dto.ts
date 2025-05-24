import { UserAttributesSchema } from "@modules/user/domain/interface/user";
import { registry } from "@shared/infrastructure/http/docs/openapi-registry";

import type { z } from "zod";

export const CreateUserDTOSchema = UserAttributesSchema.pick({
  email: true,
  phone: true,
  password: true,
  name: true,
  //   credentialUuid: true,
}).openapi("CreateUserDTO");

registry.register("CreateUserDTO", CreateUserDTOSchema);

export type CreateUserDTO = z.infer<typeof CreateUserDTOSchema>;
