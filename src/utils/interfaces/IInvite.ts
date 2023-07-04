import mongoose from "mongoose";

export interface IInvite {
  org: mongoose.Types.ObjectId;
  message: String;
}

export interface IInviteInstance extends Document, IInvite {}
