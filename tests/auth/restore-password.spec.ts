import { app } from "../../src/main";
import { registerHelper } from "./helpers/register-helper";
import request from "supertest";
import { CodeGenerator } from "../../src/shared/security/code-generator-service";
import { startEventListener } from "../../src/shared/infrastructure/event/event-listener";

describe("Auth Restore Password", () => {
  const randomEmail = `${Math.random().toString(36).substring(2, 15)}@test.com`;

  const randomPassword = "password123";

  let listenerController: Awaited<ReturnType<typeof startEventListener>>;

  beforeAll(async () => {
    listenerController = await startEventListener();

    jest.spyOn(CodeGenerator, "generateNumericCode").mockReturnValue("123456");
    jest.spyOn(CodeGenerator, "generateAlphanumericCode").mockReturnValue("123456");
    jest.spyOn(CodeGenerator, "generatePaddedRandomIntCode").mockReturnValue("123456");

    const response = await registerHelper(randomEmail, randomPassword);

    expect(response.status).toBe(201);
  });

  it("should not request a password reset with an invalid code", async () => {
    const response = await request(app).post("/v1/auth/forgot-password").send({
      email: randomEmail,
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("not_verified");
  });

  it("should request a password reset", async () => {
    await request(app).post("/v1/auth/verify-email").send({
      email: randomEmail,
      code: "123456",
    });

    const response = await request(app).post("/v1/auth/forgot-password").send({
      email: randomEmail,
    });

    expect(response.status).toBe(204);
  });

  it("should not request a password reset with an invalid email", async () => {
    const response = await request(app).post("/v1/auth/forgot-password").send({
      email: "wrongemail",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("user_not_found");
  });

  it("should reset a password", async () => {
    const response = await request(app).post("/v1/auth/reset-password").send({
      code: "123456",
      password: "password456",
    });

    expect(response.status).toBe(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe(randomEmail);
  });

  it("should not reset a password with an invalid code", async () => {
    const response = await request(app).post("/v1/auth/reset-password").send({
      code: "wrongcode",
      password: "password456",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("invalid_code");
  });

  afterAll(async () => {
    await listenerController.stop();
  });
});
