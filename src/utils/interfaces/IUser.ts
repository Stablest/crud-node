import { Document, Model } from "mongoose";

export interface IUser {
  name: String;
  email: String;
  password: String;
}

export interface IUserInstance extends IUser, Document {
  createJWT: () => string;
  comparePassword: (passwordReceived: string) => Promise<boolean>;
}
