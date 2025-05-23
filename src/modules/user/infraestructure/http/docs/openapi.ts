import { UserAttributesSchema } from "@modules/user/domain/interface/user";
import { registry } from "@shared/infraestructure/http/docs/openapi-registry";
import { GetAllResponseSchema } from "../contract/api";

registry.registerPath({
  method: "get",
  path: "/v1/users",
  summary: "Get all users",
  tags: ["Users"],
  responses: {
    200: {
      description: "List of users",
      content: {
        "application/json": {
          schema: GetAllResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/v1/users/me",
  summary: "Gets the current user",
  tags: ["Users"],
  responses: {
    200: {
      description: "User",
      content: {
        "application/json": {
          schema: UserAttributesSchema,
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
