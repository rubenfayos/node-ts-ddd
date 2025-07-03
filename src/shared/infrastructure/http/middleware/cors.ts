import cors, { type CorsOptions, type CorsOptionsDelegate, type CorsRequest } from "cors";
import type { RequestHandler } from "express";

const defaultConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  expose: ["App-X-Access-Token", "App-X-Session-Token"],
};

const corsOptionsDelegate: CorsOptionsDelegate = (req: CorsRequest, callback) => {
  const whitelist: string[] = [defaultConfig.origin];
  const requestOrigin = req.headers.origin ?? "";

  let corsOptions: CorsOptions;

  if (whitelist.includes("*")) {
    corsOptions = {
      origin: defaultConfig.credentials ? requestOrigin : "*",
      credentials: defaultConfig.credentials,
      methods: defaultConfig.methods,
      exposedHeaders: defaultConfig.expose,
    };
  } else if (whitelist.includes(requestOrigin)) {
    corsOptions = {
      origin: requestOrigin,
      credentials: defaultConfig.credentials,
      methods: defaultConfig.methods,
      exposedHeaders: defaultConfig.expose,
    };
  } else {
    // Deny request with an explicit error
    return callback(new Error(`${requestOrigin} is not a valid origin`), undefined);
  }

  return callback(null, corsOptions);
};

const corsMiddleware: RequestHandler = cors(corsOptionsDelegate);

export default corsMiddleware;
