import request from "supertest";
import { app } from "../../../src/main";

export const registerHelper = async (email: string, password: string) => {
  return request(app).post("/v1/auth/register").send({
    email,
    password,
    name: "test user",
    phone: "123456789",
  });
};
