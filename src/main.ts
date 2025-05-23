import "reflect-metadata";
import { startEventListener } from "@shared/infrastructure/event/event-listener";
import { EventPublisher } from "@shared/infrastructure/event/event-published";
import { HttpServer } from "@shared/infrastructure/http/server";
import { container } from "tsyringe";

const server = container.resolve(HttpServer);
const app = server.getApp();

startEventListener();

const publisher = container.resolve(EventPublisher);
publisher.connect();

if (process.env.NODE_ENV !== "test") {
  server.startServer();
}

export { app }; // ✅ Export for Supertest
