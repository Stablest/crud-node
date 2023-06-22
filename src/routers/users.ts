import express from "express";
import { getAllUsers } from "../controllers/users";
import { authentication } from "../middlewares/authentication";

const userRouter = express.Router();

userRouter.route("/").get(authentication, getAllUsers);

export { userRouter };
