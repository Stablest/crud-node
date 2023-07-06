import mongoose from "mongoose";

export interface IInviteModel {
  org: mongoose.Types.ObjectId;
  message: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface IInviteInstance extends Document, IInviteModel {}
