import { Document, Model } from "mongoose";

export interface IUser {
  name: String;
  email: String;
  password: String;
}
