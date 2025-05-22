import { CreateUserDTOSchema } from "@modules/user/application/dto/create-user-dto";
import { UserAttributesSchema } from "@modules/user/domain/interface/user";
import { registry } from "@shared/infraestructure/http/docs/openapi-registry";
import { z } from "zod";
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
  path: "/v1/users/{userId}",
  summary: "Get an user",
  tags: ["Users"],
  request: {
    params: z.object({
      userId: z.string().uuid(),
    }),
  },
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

registry.registerPath({
  method: "post",
  path: "/v1/users",
  summary: "Create user",
  tags: ["Users"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateUserDTOSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Created user",
      content: {
        "application/json": {
          schema: UserAttributesSchema,
        },
      },
    },
  },
});
