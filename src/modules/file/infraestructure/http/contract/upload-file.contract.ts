import {z} from "zod";


export const uploadFileBodySchema = z
  .object({
    file: z
      .any()
      .openapi({
        type: "string",
        format: "binary",
      }),
    isPublic: z
      .boolean()
      .default(false)
      .openapi({ example: true }),
  })
  .openapi("UploadFileBody");

export const uploadFileResponseSchema = z.object({
    id: z.string(),
    path: z.string(),
}).openapi("UploadFileResponse");

export type UploadFileBodyInput = z.infer<typeof uploadFileBodySchema>;

export type UploadFileResponse = z.infer<typeof uploadFileResponseSchema>;