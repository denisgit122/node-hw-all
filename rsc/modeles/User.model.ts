import { model, Schema } from "mongoose";

import { EGender, EUserStatus } from "../enums";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Passord is required"],
    },
    gender: {
      type: String,
      enum: EGender,
    },
    status: {
      type: String,
      enum: EUserStatus,
      default: EUserStatus.inactive,
    },
  },
  {
    versionKey: false,
    timestamp: true,
  }
);
export const User = model("user", userSchema);
