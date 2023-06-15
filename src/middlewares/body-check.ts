import express, { NextFunction } from "express";
import { IUser } from "../interfaces/IUser";

export function bodyCheck<T>(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  if (Object.keys(req.body).length === 0)
    return res.status(400).send("No body was found");
  next();
}
