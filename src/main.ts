import "reflect-metadata";
import { startEventListener } from "@shared/infraestructure/event/event-listener";
import { EventPublisher } from "@shared/infraestructure/event/event-published";
import { HttpServer } from "@shared/infraestructure/http/server";
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
