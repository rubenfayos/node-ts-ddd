// shared/infrastructure/http/middleware/error-handler.ts
import type { Request, Response, NextFunction } from "express";
import { ApplicationError } from "@shared/infrastructure/error/application";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
  ConflictError,
} from "@shared/infrastructure/error";
import HttpStatus from "@shared/common/enums/http-status";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  // Handle custom application errors
  if (err instanceof ApplicationError) {
    return res.status(resolveStatus(err)).json({
      name: err.name,
      message: err.message,
      details: err.details,
    });
  }

  // Unknown/unexpected errors
  console.error("[Unhandled Error]", err);

  return res.status(500).json({
    name: "InternalServerError",
    message: "Something went wrong",
  });
}

function resolveStatus(err: ApplicationError): number {
  if (err instanceof ForbiddenError) return HttpStatus.FORBIDDEN;
  if (err instanceof UnauthorizedError) return HttpStatus.UNAUTHORIZED;
  if (err instanceof ValidationError) return HttpStatus.BAD_REQUEST;
  if (err instanceof NotFoundError) return HttpStatus.NOT_FOUND;
  if (err instanceof ConflictError) return HttpStatus.CONFLICT;
  return 500;
}
