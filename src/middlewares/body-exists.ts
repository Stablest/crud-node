import express, { NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request";

export function bodyExists(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  if (Object.keys(req.body).length === 0)
    throw new BadRequestError("Please provide a JSON body");
  next();
}
