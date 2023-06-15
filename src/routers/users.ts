import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users";
import { bodyCheck } from "../middlewares/body-check";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(bodyCheck, createUser);
userRouter
  .route("/:id")
  .get(getUser)
  .patch(bodyCheck, updateUser)
  .delete(deleteUser);

export { userRouter };
