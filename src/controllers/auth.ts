import express from "express";
import { AuthenticationError } from "../errors/authentication-error";
import { configDotenv } from "dotenv";
import { userModel } from "../models/User";
import { IUser } from "../interfaces/IUser";
import { BadRequestError } from "../errors/bad-request";
import { ITokenResponse } from "../interfaces/IToken";
configDotenv();

async function loginUser(
  req: express.Request<any, any, IUser>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new BadRequestError("Please provide email and password");
    const user = await userModel.findOne({ email });
    if (!user) throw new AuthenticationError("Invalid email or password");
    const isPasswordCorrect = await user.comparePassword(password.toString());
    if (!isPasswordCorrect)
      throw new AuthenticationError("Invalid email or password");
    const token = user.createJWT();
    const responseObject: ITokenResponse = {
      user: { id: user._id, permission: user.permission },
      token,
    };
    return res.status(200).json(responseObject);
  } catch (err) {
    next(err);
  }
}

async function registerUser(
  req: express.Request<any, any, IUser>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const user = await userModel.create({ ...req.body });
    const token = user.createJWT();
    const responseObject: ITokenResponse = {
      user: { id: user._id, permission: user.permission },
      token,
    };
    res.status(201).json(responseObject);
  } catch (err: unknown) {
    next(err);
  }
}

export { loginUser, registerUser };
