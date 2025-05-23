import "express-async-errors";
import { injectable } from "tsyringe";

import registerApplicationRouters from "@shared/infrastructure/http/controller";
import registerApplicationMiddlewares from "@shared/infrastructure/http/middleware";

import Config from "@config";
import { bootstrapEventSystem } from "@shared/infrastructure/event/event-system-bootstrapper";
import express, { type Application } from "express";
import { errorHandler } from "@shared/infrastructure/http/middleware/error-handler";

@injectable()
export class HttpServer {
  private readonly app: Application;

  constructor() {
    this.app = express();
    this.init();
  }

  private async init() {
    if (Config.NODE_ENV !== "test") {
      await bootstrapEventSystem();
    }

    await this.registerRoutes();

    // await initDB();
    // await initMigration();
    // await initModels();
  }

  public async registerRoutes() {
    await registerApplicationMiddlewares(this.app);
    await registerApplicationRouters(this.app);

    this.app.use(errorHandler);
  }

  public async startServer() {
    this.app.listen(Config.APP_PORT, () => {
      console.log(`Server available at http://localhost:${Config.APP_PORT}`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
