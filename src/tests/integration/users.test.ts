import superTest from "supertest";
import { configDotenv } from "dotenv";
import { app } from "../../app";
import { userModel } from "../../models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

configDotenv();

const userCreateMongo = [
  {
    name: "Stablest",
    email: "stablest@",
    password: "abcd1234",
  },
  {
    name: "Stablest2",
    email: "stablest@2",
    password: "abcd1234",
  },
];

const userResponse = [
  {
    _id: expect.any(String),
    name: expect.any(String),
    email: expect.any(String),
    permission: expect.any(Number),
  },
  {
    _id: expect.any(String),
    name: expect.any(String),
    email: expect.any(String),
    permission: expect.any(Number),
  },
];

describe("user", () => {
  describe("GET /", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGO_TEST_URI as string);
      await userModel.create(...userCreateMongo);
    });
    it("should return all users if permission >= 2", async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 1, permission: 2 });
      const res = await superTest(app)
        .get("/api/v1/users")
        .set("Authorization", "Bearer");
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        users: userResponse,
      });
    });

    it("shoud receive error message if permission is less than 2", async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 1, permission: 0 });
      const res = await superTest(app)
        .get("/api/v1/users")
        .set("Authorization", "Bearer");
      expect(res.statusCode).toBe(403);
      expect(res.body).toEqual({
        message: "Not authorized to acess this route",
      });
    });
    afterAll(async () => {
      await userModel.deleteMany({});
      await mongoose.disconnect();
    });
  });
});
