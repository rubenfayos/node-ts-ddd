import { registry } from "@shared/infrastructure/http/docs/openapi-registry";
import { createTicketSchema } from "../contract/ticket.contract";

registry.registerPath({
  method: "post",
  path: "/v1/customer-service/tickets",
  summary: "Create a new ticket",
  tags: ["Customer Service"],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: createTicketSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Ticket created",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/v1/customer-service/tickets",
  summary: "Get all tickets",
  tags: ["Customer Service"],
  responses: {
    200: {
      description: "Tickets",
      content: {
        "application/json": {
          schema: {},
        },
      },
    },
  },
});
