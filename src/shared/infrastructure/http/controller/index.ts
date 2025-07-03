import privateRouter from "@shared/infrastructure/http/controller/private/";
import publicRouter from "@shared/infrastructure/http/controller/public/";
import type { Application } from "express";
import express from "express";

import swaggerRouter from "@shared/infrastructure/http/controller/swagger/";
import path from "node:path";

const registerApplicationRouters = async (app: Application) => {
  app.use(
    "/public",
    express.static(path.resolve(__dirname, path.join("..", "..", "..", "..", "..", "public"))),
  );

  app.use(swaggerRouter);

  app.use(publicRouter);

  app.use(privateRouter);
};

export default registerApplicationRouters;
