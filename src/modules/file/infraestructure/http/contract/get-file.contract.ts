import {z} from "zod";

export const getFileParams = z.object({
    fileId: z.string(),
}).openapi("GetFileParams");

export type GetFileParams = z.infer<typeof getFileParams>;

export const getFileSchema = z.object({
    fileId: z.string(),
    userId: z.string(),
})

export type GetFileInput = z.infer<typeof getFileSchema>;