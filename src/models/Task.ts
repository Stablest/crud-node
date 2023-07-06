import mongoose from "mongoose";
import { ITaskInstance } from "../utils/interfaces/ITask";
import { TaskStatusEnum } from "../utils/enums/TaskEnum";

const taskSchema = new mongoose.Schema<ITaskInstance>({
  name: {
    type: String,
    requided: [true, "Please provide a name"],
  },
  responsibleUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: { type: String, default: "No description" },
  status: {
    type: String,
    enum: TaskStatusEnum,
    default: TaskStatusEnum.PENDING,
  },
  label: [{ type: String }],
  org: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  createdAt: { type: Date, default: Date.now() },
});

const taskModel = mongoose.model("Task", taskSchema);
export { taskModel };
