import { useLogger } from "@shared/packages/logger";
import type { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const log = useLogger("Express Server");
  const start = Date.now();

  log.log(`${req.method} ${req.originalUrl}`);

  // Capture response finish or error
  res.on("finish", () => {
    const duration = Date.now() - start;
    log.log(`${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

  res.on("error", (err) => {
    const duration = Date.now() - start;
    log.error(err, `${req.method} ${req.originalUrl} - failed after ${duration}ms`);
  });

  next();
};

export default logger;
