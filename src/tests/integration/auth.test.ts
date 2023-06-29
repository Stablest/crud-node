import supertest from "supertest";
import { app } from "../../app";
import { userModel } from "../../models/User";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { ITokenResponse } from "../../interfaces/IToken";
configDotenv();

const userCreateMongo = [
  {
    name: "Stablest",
    email: "stablest@email.com",
    password: "abcd1234",
  },
  {
    name: "Stablest2",
    email: "stablest2@email.com",
    password: "abcd1234",
  },
];

describe("auth", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI as string);
    await userModel.create(userCreateMongo);
  });

  describe("/login", () => {
    it("should return user and jwt token if sucessful", async () => {
      const expectedResponse: ITokenResponse = {
        user: { id: expect.any(String), permission: expect.any(Number) },
        token: expect.any(String),
      };
      const inputUser = {
        email: "stablest@email.com",
        password: "abcd1234",
      };
      const res = await supertest(app)
        .post("/api/v1/auth/login")
        .send(inputUser);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expectedResponse);
    });
    it("should return status code 400 and error message if there's an invalid body", async () => {
      const res = await supertest(app).post("/api/v1/auth/login").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
    it("should return status code 401 and error message if user email is not found or if password is wrong", async () => {
      const res = await supertest(app)
        .post("/api/v1/auth/login")
        .send({ email: "email@email.com", password: "password_test123" });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("/register", () => {
    it("should return user and jwt token if sucessful", async () => {
      const expectedResponse: ITokenResponse = {
        user: { id: expect.any(String), permission: expect.any(Number) },
        token: expect.any(String),
      };
      const inputUser = {
        name: "Stablest",
        email: "stablest3@email.com",
        password: "abcd1234",
      };
      const res = await supertest(app)
        .post("/api/v1/auth/register")
        .send(inputUser);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(expectedResponse);
    });

    it("should return status code 400 and error message if there's an invalid body", async () => {
      const res = await supertest(app).post("/api/v1/auth/register").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await mongoose.disconnect();
  });
});
