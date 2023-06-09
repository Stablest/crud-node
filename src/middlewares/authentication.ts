import express from "express";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../errors/authentication-error";
import { configDotenv } from "dotenv";
import { IUser } from "../utils/interfaces/IUser";
import { ITokenUser } from "../utils/interfaces/IToken";
configDotenv();

function authentication(
  req: express.Request<any, any, IUser>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      throw new AuthenticationError(
        "Please provide a valid authentication token"
      );
    const token = req.headers.authorization.split(" ")[1];
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as ITokenUser;

    const tokenUser: ITokenUser = {
      id: tokenPayload.id,
    };
    res.locals.user = tokenUser;
    next();
  } catch (err) {
    next(err);
  }
}

export { authentication };
