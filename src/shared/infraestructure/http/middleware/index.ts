import os from "node:os";
import { v4 as uuidv4 } from "uuid";

import corsMiddleware from "./cors";
import logger from "./logger";
import securityMiddleware from "./security";

import type { Application, NextFunction, Request, Response } from "express";
import express from "express";

const registerApplicationMiddlewares = async (app: Application) => {
  // app.use(sentry.middleware); // must go first to catch errors

  // Security headers
  app.use(securityMiddleware);

  // Body parser (Express has it built-in)
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS
  app.use(corsMiddleware);

  // Logging middleware
  app.use(logger);

  // Add Request ID to context
  app.use((req: Request, res: Response, next: NextFunction) => {
    const reqId = `${os.hostname()}-${uuidv4()}`;
    res.setHeader("App-X-RequestId", reqId);
    res.locals.requestId = reqId; // store it in res.locals for access in controllers
    next();
  });
};

export default registerApplicationMiddlewares;
