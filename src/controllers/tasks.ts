import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request";
import { NotFoundError } from "../errors/not-found-error";
import { taskModel } from "../models/Task";
import { stringToMongoId } from "../utils/functions/stringToMongoId";
import { IOrganizationInstance } from "../utils/interfaces/IOrganization";

async function getAllOrgTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const orgTasks = (await org.populate("tasks")).tasks;
    return res.status(200).json(orgTasks);
  } catch (err) {
    next(err);
  }
}

async function createNewTask(req: Request, res: Response, next: NextFunction) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const { name, responsibleUsers, description, status, label } = req.body;
    const newTask = {
      name,
      responsibleUsers,
      description,
      status,
      label,
      org: org._id,
    };
    if (!responsibleUsers)
      throw new BadRequestError(
        "Please provide a valid responsibleUsers value"
      );
    const task = await taskModel.create(newTask);
    const updatedOrg = await org.updateOne({ $push: { tasks: task._id } });
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const { taskId } = req.params;
    if (!taskId) throw new BadRequestError("Please provide a taskId value");
    const isTaskIncluded = org.checkIsTaskIncluded(taskId);
    if (!isTaskIncluded)
      throw new BadRequestError("Please provide a valid taskId value");
    const { name, responsibleUsers, description, status, label } = req.body;
    const objIdResponsibleUsers = stringToMongoId(responsibleUsers);
    const updatedTask = {
      name,
      responsibleUsers: objIdResponsibleUsers,
      description,
      status,
      label,
      org: org._id,
    };
    const task = await taskModel.findByIdAndUpdate(
      taskId,
      { ...updatedTask },
      { new: true }
    );
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const { taskId } = req.params;
    if (!taskId)
      throw new BadRequestError("Please provide a valid taskId value");
    const isTaskIncluded = org.checkIsTaskIncluded(taskId);
    if (!isTaskIncluded)
      throw new BadRequestError("Please provide a valid taskId value");
    const task = await taskModel.findByIdAndDelete(taskId);
    if (!task)
      throw new BadRequestError("Task already deleted or didn't exist");
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

export { createNewTask, updateTask, deleteTask, getAllOrgTasks };
