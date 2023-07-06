import mongoose from "mongoose";

export function stringToMongoId(stringId: string | string[] | undefined) {
  if (typeof stringId === "undefined") return undefined;
  if (typeof stringId === "string") {
    const objId: mongoose.Types.ObjectId[] = [];
    objId.push(new mongoose.Types.ObjectId(stringId));
    return objId;
  }
  if (stringId.constructor === Array) {
    const objId: mongoose.Types.ObjectId[] = [];
    for (const string of stringId) {
      objId.push(new mongoose.Types.ObjectId(string));
    }
    return objId;
  }
  return undefined;
}
