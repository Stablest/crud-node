import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/tasks";
import { bodyExists } from "../middlewares/body-exists";

const taskRouter = express.Router();

taskRouter.route("/").get(getAllTasks).post(bodyExists, createTask);
taskRouter.route("/:id").patch(bodyExists, updateTask).delete(deleteTask);

export { taskRouter };
