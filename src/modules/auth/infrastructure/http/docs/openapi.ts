import { registry } from "@shared/infrastructure/http/docs/openapi-registry";
import { forgetPasswordSchema, resetPasswordSchema } from "../contract/forget-password";
import { LoginResponseSchema, LoginSchema } from "../contract/login";
import { RegisterSchema } from "../contract/register";
import { verifyEmailSchema } from "../contract/verify-email";

registry.registerPath({
  method: "post",
  path: "/v1/auth/register",
  summary: "Register a new user",
  tags: ["Auth"],
  responses: {
    201: {
      description: "",
    },
  },
  request: {
    body: {
      content: {
        "application/json": {
          schema: RegisterSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/v1/auth/login",
  summary: "Login a user",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User and token",
      content: {
        "application/json": {
          schema: LoginResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/v1/auth/forget-password",
  summary: "Forget password",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: forgetPasswordSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User and token",
      content: {
        "application/json": {
          schema: LoginResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/v1/auth/reset-password",
  summary: "Forget password",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: resetPasswordSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User and token",
      content: {
        "application/json": {
          schema: LoginResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/v1/auth/verify-email",
  summary: "Verify email",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: verifyEmailSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User and token",
      content: {
        "application/json": {
          schema: LoginResponseSchema,
        },
      },
    },
  },
});

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});
