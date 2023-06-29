import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    requided: [true, "Please provide a name"],
    unique: true,
  },
  responsibleUserId: { type: String, required: [true, "Please provide a id"] },
  done: { type: Boolean, default: false },
});

const taskModel = mongoose.model("Task", taskSchema);
export { taskModel };
