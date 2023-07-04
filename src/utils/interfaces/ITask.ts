import mongoose from "mongoose";

export interface ITask {
  name: String;
  responsibleUsersId: mongoose.Types.ObjectId[];
  description: String;
  status: String;
  label: String[];
}

export interface ITaskInstance extends Document, ITask {}

export enum TaskStatus {
  done = "done",
  pending = "pending",
  testing = "testing",
}