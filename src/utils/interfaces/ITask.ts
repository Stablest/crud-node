import mongoose from "mongoose";

export interface ITask {
  name: string;
  responsibleUsers: string[] | undefined;
  description: string;
  status: string;
  label: string[];
  org: string;
  createdAt: Date;
}

export interface ITaskModel {
  name: string;
  responsibleUsers: mongoose.Types.ObjectId[];
  description: string;
  status: string;
  label: string[];
  org: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface ITaskInstance extends Document, ITaskModel {}
