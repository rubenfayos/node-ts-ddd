import { registry } from "@shared/infrastructure/http/docs/openapi-registry";
import {
  uploadFileBodySchema,
  uploadFileResponseSchema,
} from "@modules/file/infraestructure/http/contract/upload-file.contract";
import { getFileParams } from "@modules/file/infraestructure/http/contract/get-file.contract";
import { z } from "zod";

registry.registerPath({
  method: "post",
  path: "/v1/files/upload",
  summary: "Upload a file",
  tags: ["Files"],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: uploadFileBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "File",
      content: {
        "application/json": {
          schema: uploadFileResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/v1/files/{fileId}",
  summary: "Get a file",
  tags: ["Files"],
  request: {
    params: getFileParams,
  },
  responses: {
    200: {
      description: "File",
      content: {
        "application/json": {
          schema: z.string(),
        },
      },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/v1/files/{fileId}",
  summary: "Delete a file",
  tags: ["Files"],
  request: {
    params: getFileParams,
  },
  responses: {
    204: {
      description: "File deleted",
    },
  },
});
