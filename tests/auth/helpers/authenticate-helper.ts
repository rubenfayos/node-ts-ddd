import request from "supertest";
import { app } from "../../../src/main";

export async function loginTestUser() {
  const email = `testuser-${Date.now()}@example.com`;
  const password = "test123";

  // 1. Register user
  await request(app).post("/v1/auth/register").send({ email, password });

  // 3. Login
  const res = await request(app).post("/v1/auth/login").send({ email, password });

  return {
    token: res.body.token,
    email,
    password,
  };
}
