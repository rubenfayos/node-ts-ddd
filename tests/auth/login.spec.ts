import { registerHelper } from "./helpers/register-helper";
import request from "supertest";
import { app } from "../../src/main";
import { startEventListener } from "../../src/shared/infrastructure/event/event-listener";

describe("Auth Login", () => {
  let listenerController: Awaited<ReturnType<typeof startEventListener>>;

  const randomEmail = `${Math.random().toString(36).substring(2, 15)}@test.com`;
  const randomPassword = "password123";

  beforeAll(async () => {
    listenerController = await startEventListener();

    const response = await registerHelper(randomEmail, randomPassword);

    expect(response.status).toBe(201);
  });

  it("should login a user", async () => {
    const response = await request(app).post("/v1/auth/login").send({
      email: randomEmail,
      password: randomPassword,
    });

    expect(response.status).toBe(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe(randomEmail);
  });

  it("should not login a user with invalid credentials", async () => {
    const response = await request(app).post("/v1/auth/login").send({
      email: randomEmail,
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("invalid_credentials");
  });

  afterAll(async () => {
    await listenerController.stop();
  });
});
