import type { RequestHandler } from "express";
import helmet from "helmet";

const securityMiddleware: RequestHandler = helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false,
  originAgentCluster: false,
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "connect-src": ["'self'", "https:"],
      "img-src": ["'self'", "data:", "blob:"],
      "media-src": ["'self'", "data:", "blob:"],
      // helmet doesn't allow `null` — omit or set to [] to disable
      upgradeInsecureRequests: [],
    },
  },
  xssFilter: false, // no longer a supported option in Helmet v6+
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
  frameguard: {
    action: "sameorigin",
  },
});

export default securityMiddleware;
