import request from "supertest";
import { app } from "../../src/main";
import { loginTestUser } from "../auth/helpers/authenticate-helper";

describe("Create organization", () => {
  let jwtToken: string;

  beforeAll(async () => {
    const response = await loginTestUser();

    jwtToken = response.token;
  });

  it("should create organization", async () => {
    const organization = {
      name: "Test Organization",
    };

    const response = await request(app)
      .post("/v1/organizations")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(organization);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
  });
});
