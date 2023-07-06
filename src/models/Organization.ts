import mongoose from "mongoose";
import { IOrganizationInstance } from "../utils/interfaces/IOrganization";

const OrgSchema = new mongoose.Schema<IOrganizationInstance>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
  },
  users: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      permission: { type: Number, default: 0 },
    },
  ],
  pendingUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invite" }],
  isPrivate: { type: Boolean },
});

OrgSchema.methods.checkIsRegistered = function checkIsRegistered(
  userId: string
) {
  for (const user of this.users) {
    if (userId === user._id.toString()) return true;
  }
  return false;
};

OrgSchema.methods.checkIsAdmin = function checkIsAdmin(userId: string) {
  for (const checkUser of this.users) {
    if (checkUser._id.toString() === userId) {
      if ((checkUser.permission as number) < 2) return false;
      return true;
    }
  }
  return false;
};

OrgSchema.methods.checkIsTaskIncluded = function checkIsTaskIncluded(
  newTaskId: string
) {
  for (const taskId of this.tasks) {
    if (newTaskId === taskId.toString()) return true;
  }
  return false;
};

OrgSchema.methods.createAdmin = async function (id: string) {
  const objId = new mongoose.Types.ObjectId(id);
  this.users.push({ _id: objId, permission: 2 });
  const org = await this.save();
  if (!org) return false;
  return true;
};

OrgSchema.methods.removeFromArray = async function (key: string, id: string) {
  const objId = new mongoose.Types.ObjectId(id);
  for (const value of this[key]) {
    if (id === value.toString()) {
      const updated = await this.updateOne({ $pull: { invites: objId } });
      if (updated) return true;
    }
  }
  return false;
};

const orgModel = mongoose.model("Organization", OrgSchema);

export { orgModel };
