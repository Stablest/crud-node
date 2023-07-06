import { Router, Request, Response } from "express";
import {
  createNewTask,
  deleteTask,
  getAllOrgTasks,
  updateTask,
} from "../../../controllers/tasks";
import { validateOrgAdmin } from "../../../middlewares/organization/validate-org-admin";
import { validateOrgUser } from "../../../middlewares/organization/validate-org-user";

const taskRouter = Router({ mergeParams: true });

taskRouter
  .route("/")
  .get(validateOrgUser, getAllOrgTasks)
  .post(validateOrgAdmin, createNewTask);
taskRouter
  .route("/:taskId")
  .patch(validateOrgAdmin, updateTask)
  .delete(validateOrgAdmin, deleteTask);

export { taskRouter };
