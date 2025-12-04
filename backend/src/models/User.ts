import mongoose, { Document, Model } from "mongoose";

export interface UserAttrs {
  email: string;
  passwordHash: string;
}

export interface UserDoc extends Document, UserAttrs {}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { versionKey: false }
);

export const User: Model<UserDoc> =
  mongoose.models.User || mongoose.model<UserDoc>("User", userSchema);
