import mongoose, { Document } from "mongoose";
import { IInviteInstance } from "./IInvite";

export interface IOrganization {
  name: string;
  users: IOrganizationUser[];
  pendingUsers: mongoose.Types.ObjectId[];
  tasks: mongoose.Types.ObjectId[];
  invites: mongoose.Types.ObjectId[];
  isPrivate: boolean;
}

export interface IOrganizationUser {
  _id: mongoose.Types.ObjectId;
  permission: Number;
}

export interface IOrganizationInstance extends Document, IOrganization {
  createAdmin: (id: string) => Promise<IOrganizationInstance>;
  checkIsAdmin: (userId: string) => boolean;
  createNewInvite: (message: string) => Promise<IInviteInstance>;
  createNewTask: () => Promise<any>;
}
