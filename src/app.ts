import express from "express";
import { userRouter } from "./routers/users";
import { notFound } from "./middlewares/not-found";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use(notFound);

export { app };
