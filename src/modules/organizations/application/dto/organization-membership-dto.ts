import { UserAttributesSchema } from "@modules/user/domain/interface/user";
import { z } from "zod";

export const organizationMembershipDtoSchema = z.union([
  z.object({
    role: z.string(),
  }),
  UserAttributesSchema.pick({
    id: true,
    name: true,
    email: true,
  }),
]);
//   role: z.string(),
//   user: UserAttributesSchema.pick({
//     id: true,
//     name: true,
//     email: true,
//   }),
// });

export type OrganizationMembershipDto = z.infer<typeof organizationMembershipDtoSchema>;
