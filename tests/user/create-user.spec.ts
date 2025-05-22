import request from "supertest";
import { app } from "../../src/main"; // Adjust path

describe("POST /public/v1/users", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/public/v1/users").send({
      email: "test@example.com",
      password: "password123",
      phone: "123456789",
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe("test@example.com");
  });
});
