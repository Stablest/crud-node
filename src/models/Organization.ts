import mongoose from "mongoose";
import { IOrganizationInstance } from "../utils/interfaces/IOrganization";
import { CustomAPIError } from "../errors/custom-api-error";
import { inviteModel } from "./Invites";
import { IInvite } from "../utils/interfaces/IInvite";
import { AuthorizationError } from "../errors/authorization-error";

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

OrgSchema.methods.createAdmin = async function (id: string) {
  const objId = new mongoose.Types.ObjectId(id);
  this.users.push({ _id: objId, permission: 2 });
  const org = await this.save();
  if (!org) return false;
  return true;
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

OrgSchema.methods.createNewInvite = async function createNewInvite(
  message: string
) {
  if (!(this.invites.length <= 5))
    throw new AuthorizationError("Max invites reached");
  const newInvite: IInvite = {
    org: this._id,
    message: message,
  };
  const invite = await inviteModel.create(newInvite);
  if (!invite) throw new CustomAPIError("Something went wrong");
  const updatedOrg = await this.updateOne({ $push: { invites: invite._id } });
  if (!updatedOrg) throw new CustomAPIError("Something went wrong");
  return invite;
};

OrgSchema.methods.createNewTask = async function createNewTask() {};

const orgModel = mongoose.model("Organization", OrgSchema);

export { orgModel };
