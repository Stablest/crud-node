import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request";
import { orgModel } from "../models/Organization";
import { IOrganizationInstance } from "../utils/interfaces/IOrganization";

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

async function createNewInvite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const { message } = req.body;
    if (!message) throw new BadRequestError("Please provide a message");
    const newInvite = await org.createNewInvite(message);
    return res.status(200).json(newInvite);
  } catch (err) {
    next(err);
  }
}

async function createNewTask(req: Request, res: Response, next: NextFunction) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const { name, responsibleUsers, description, status, label } = req.body;
    const task = {
      name,
      responsibleUsers,
      description,
      status,
      label,
    };
    const newTask = await org.createNewTask(task);
    return res.status(200).json(newTask);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const { taskId } = req.params;
    if (!taskId) throw new BadRequestError("Please provide a valid task id");
    const { name, responsibleUsers, description, status, label } = req.body;
    const task = {
      name,
      responsibleUsers,
      description,
      status,
      label,
    };
    const updatedTask = await org.updateTask(task, taskId);
    return res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
}

export {
  createOrganization,
  deleteOrganization,
  createNewInvite,
  createNewTask,
  updateTask,
};
