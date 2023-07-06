import mongoose, { Document } from "mongoose";
import { IInviteInstance } from "./IInvite";
import { OrganizationRemoveFromArray } from "../enums/Organization";

export interface IOrganization {
  name: string;
  users: string[];
  pendingUsers: string[];
  tasks: string[];
  invites: string[];
  isPrivate: boolean;
}

export interface IOrganizationModel {
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

export interface IOrganizationInstance extends Document, IOrganizationModel {
  createAdmin: (id: string) => Promise<IOrganizationInstance>;
  checkIsAdmin: (userId: string) => boolean;
  checkIsRegistered: (userId: string) => boolean;
  checkIsTaskIncluded: (taskId: string) => boolean;
  checkIsInviteIncluded: (inviteId: string) => boolean;
  removeFromArray: (
    key: OrganizationRemoveFromArray,
    id: string
  ) => Promise<boolean>;
}
