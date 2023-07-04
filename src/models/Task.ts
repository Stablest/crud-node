import mongoose from "mongoose";
import { ITaskInstance } from "../utils/interfaces/ITask";

const taskSchema = new mongoose.Schema<ITaskInstance>({
  name: {
    type: String,
    requided: [true, "Please provide a name"],
    unique: true,
  },
  responsibleUsersId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: { type: String, default: "No description" },
  status: {
    type: String,
    enum: ["done", "pending", "testing"],
    default: "pending",
  },
  label: [{ type: String }],
});

const taskModel = mongoose.model("Task", taskSchema);
export { taskModel };
