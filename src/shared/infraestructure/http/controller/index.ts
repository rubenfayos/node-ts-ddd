import privateRouter from "@shared/infraestructure/http/controller/private/";
import publicRouter from "@shared/infraestructure/http/controller/public/";
import type { Application } from "express";

import swaggerRouter from "@shared/infraestructure/http/controller/swagger/";

const registerApplicationRouters = async (app: Application) => {
  app.use(swaggerRouter);

  app.use(publicRouter);

  // Private routes
  app.use(privateRouter);
};

export default registerApplicationRouters;
