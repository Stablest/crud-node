import express from "express";
import { userRouter } from "./routers/users";
import { notFound } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";
import { authRouter } from "./routers/auth";
import { authentication } from "./middlewares/authentication";
import { taskRouter } from "./routers/tasks";
import { organizationRouter } from "./routers/organization";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", authentication, taskRouter);
app.use("/api/v1/organizations", authentication, organizationRouter);
app.use(notFound);
app.use(errorHandler);

export { app };
