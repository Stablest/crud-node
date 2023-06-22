import mongoose from "mongoose";
import { IUserInstance } from "../interfaces/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema<IUserInstance>({
  name: { type: String, required: [true, "Please provide a name"] },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: { type: String, required: [true, "Please provide a password"] },
});

UserSchema.pre("save", async function () {
  const userSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password.toString(), userSalt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id }, "asasasac", { expiresIn: "30d" });
};

UserSchema.methods.comparePassword = async function (passwordReceived: string) {
  bcrypt.compare(this.password, passwordReceived);
};

const userModel = mongoose.model("User", UserSchema);

export { userModel };
