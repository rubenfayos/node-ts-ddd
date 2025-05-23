import { injectable } from "tsyringe";

import registerApplicationRouters from "@shared/infraestructure/http/controller";
import registerApplicationMiddlewares from "@shared/infraestructure/http/middleware";

import Config from "@config";
import { bootstrapEventSystem } from "@shared/infraestructure/event/event-system-bootstrapper";
import express, { type Application } from "express";

@injectable()
export class HttpServer {
  private readonly app: Application;

  constructor() {
    this.app = express();
    this.init();
  }

  private async init() {
    await bootstrapEventSystem();
    await this.registerRoutes();

    // await initDB();
    // await initMigration();
    // await initModels();
  }

  public async registerRoutes() {
    await registerApplicationMiddlewares(this.app);
    await registerApplicationRouters(this.app);
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
