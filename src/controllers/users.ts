import express from "express";
import { userModel } from "../models/User";
import { IUser } from "../interfaces/IUser";
import { AuthenticationError } from "../errors/authentication-error";

async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    const allUsers = await userModel.find();
    res.status(200).json({ users: allUsers });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}

export { getAllUsers };
