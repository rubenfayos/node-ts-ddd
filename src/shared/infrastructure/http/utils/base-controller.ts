import type { Router } from "express";
import type { z } from "zod";
import { removeNulls } from "./base-controller-helper";

export abstract class BaseController {
  abstract register(): Router;

  generateResponse<O extends object>(schema: z.ZodType, data: O) {
    return schema.transform((d) => removeNulls(d)).parse(data);
  }
}
