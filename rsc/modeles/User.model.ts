import { model, Schema } from "mongoose";

import { EGender } from "../enums";

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
    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamp: true,
  }
);
export const User = model("user", userSchema);
