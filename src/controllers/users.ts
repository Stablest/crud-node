import express from "express";
import { userModel } from "../models/User";
import { IUser } from "../interfaces/IUser";
import { AuthenticationError } from "../errors/authentication-error";
import { AuthorizationError } from "../errors/authorization-error";

async function getAllUsers(
  req: express.Request<any, any, IUser>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    if (res.locals.user.permission <= 1)
      throw new AuthorizationError("Not authorized to acess this route");
    const allUsers = await userModel.find({}, "name email permission");
    res.status(200).json({ users: allUsers });
  } catch (err) {
    next(err);
  }
}

export { getAllUsers };
