import "reflect-metadata";
import { HttpServer } from "@shared/infraestructure/http/server";
import { container } from "tsyringe";

const server = container.resolve(HttpServer);
const app = server.getApp();

if (process.env.NODE_ENV !== "test") {
  server.startServer();
}

export { app }; // ✅ Export for Supertest
