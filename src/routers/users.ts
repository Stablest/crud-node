import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users";
import { bodyExists } from "../middlewares/body-exists";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(bodyExists, createUser);
userRouter
  .route("/:id")
  .get(getUser)
  .patch(bodyExists, updateUser)
  .delete(deleteUser);

export { userRouter };
