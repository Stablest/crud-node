import { model, Schema } from "mongoose";

const inviteSchema = new Schema({
  title: { type: String, required: true },
  org: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, expires: "7d", default: Date.now() },
});

const inviteModel = model("Invite", inviteSchema);

export { inviteModel };
