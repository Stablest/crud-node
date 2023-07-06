import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request";
import { orgModel } from "../models/Organization";
import { IOrganizationInstance } from "../utils/interfaces/IOrganization";
import { UnknownError } from "../errors/unknown-error";

async function createOrganization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, isPrivate } = req.body;
    if (!name || typeof isPrivate !== "boolean")
      throw new BadRequestError("Please provide name and isPrivate");
    const newOrg = await orgModel.create({ name, isPrivate });
    const createdUser = await newOrg.createAdmin(res.locals.user.id);
    return res.status(201).json(newOrg);
  } catch (err) {
    next(err);
  }
}

async function deleteOrganization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const deletedOrg = await org.deleteOne();
    if (!deletedOrg)
      throw new BadRequestError(
        "Organization already deleted or doesn't exist"
      );
    return res.status(200).json(deletedOrg);
  } catch (err) {
    next(err);
  }
}

export { createOrganization, deleteOrganization };
