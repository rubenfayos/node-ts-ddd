import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./openapi-registry";

import "@modules/user/infrastructure/http/docs/openapi";
import "@modules/auth/infrastructure/http/docs/openapi";
import "@modules/file/infraestructure/http/docs/open-api";
import "@modules/organizations/infraestructure/http/docs/openapi";

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Nodejs TS DDD API",
    version: "1.0.0",
  },
  security: [{ bearerAuth: [] }], // 👈 this makes it global
});
