import express from "express";
import { taskModel } from "../models/Task";
import { BadRequestError } from "../errors/bad-request";
import { userModel } from "../models/User";

async function getAllTasks(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const allTasks = await taskModel.find({});
    return res.status(200).json({ tasks: allTasks });
  } catch (err) {
    next(err);
  }
}

async function createTask(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { name, responsibleUserId, done } = req.body;
    if (!name || !responsibleUserId)
      throw new BadRequestError("Please provide name and responsibleUserId");
    const taskedUser = await userModel.findById(responsibleUserId);
    if (!taskedUser)
      throw new BadRequestError("Please provide a valid user ID");
    const newTask = await taskModel.create({ name, responsibleUserId, done });
    return res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
}

async function updateTask(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Please provide a valid id");
    const { name, responsibleUserId, done } = req.body;
    if (!name && !responsibleUserId && !done)
      throw new BadRequestError("Please provide valid properties");
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      {
        name,
        responsibleUserId,
        done,
      },
      { new: true }
    );
    return res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
}

async function deleteTask(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Please provide a valid id");
    const deletedTask = await taskModel.findByIdAndRemove(id);
    if (!deletedTask)
      throw new BadRequestError("Task already deleted or didn't exist");
    return res.status(200).json(deletedTask);
  } catch (err) {
    next(err);
  }
}

export { getAllTasks, createTask, deleteTask, updateTask };
