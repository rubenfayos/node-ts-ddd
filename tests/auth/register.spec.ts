import { registerHelper } from "./helpers/register-helper";

import { startEventListener } from "../../src/shared/infrastructure/event/event-listener";

describe("Auth Register", () => {
  const randomEmail = `${Math.random().toString(36).substring(2, 15)}@test.com`;

  let listenerController: Awaited<ReturnType<typeof startEventListener>>;

  beforeAll(async () => {
    listenerController = await startEventListener();
  });

  it("should register a user", async () => {
    const response = await registerHelper(randomEmail, "123456");

    expect(response.status).toBe(201);
  });

  it("should not register a user with an existing email", async () => {
    const response = await registerHelper(randomEmail, "123456");

    expect(response.status).toBe(400);
    expect(response.body.details).toBe("A user with that email already exists");
  });

  afterAll(async () => {
    await listenerController.stop();
  });
});
