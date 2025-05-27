import Config from "@config";
import type * as Sentry from "@sentry/node";
import { stripUrlQueryAndFragment } from "@sentry/utils";
import { useLogger } from "@shared/packages/logger";
import type { NextFunction, Request, Response } from "express";
import createSentryService from "@shared/infrastructure/external/sentry/services/sentry";

const logger = useLogger("Sentry");

const sentryMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const sentryService: ReturnType<typeof createSentryService> = createSentryService();

  sentryService.init();
  const sentry = sentryService.getInstance();

  if (!sentry) {
    logger.warn("No Sentry DSN provided!");

    // initialization failed
    next();
    return;
  }

  const reqMethod = (req.method || "").toUpperCase();
  const reqUrl = req.url && stripUrlQueryAndFragment(req.url);

  try {
    next();
  } catch (error) {

    if (error instanceof Error) {
      sentryService.sendError(error, (scope: Sentry.Scope) => {
        scope.addEventProcessor((event) => {
          return sentry.Handlers.parseRequest(event, req as Sentry.Request, {
            // Don't parse the transaction name, we'll do it manually
            transaction: false,
          });
        });

        // Manually add transaction name
        // scope.setTag("transaction", `${reqMethod} ${reqUrl} ${req._matchedRoute}`);
        scope.setTag("url", reqUrl);
        scope.setTag("method", reqMethod);
        scope.setTag("environment", Config.NODE_ENV);
        scope.setTag("ip_address", req.ip);
        scope.setTag("user_agent", req.get("User-Agent"));
      });
    }

    throw error;
  }
};

export default sentryMiddleware;
