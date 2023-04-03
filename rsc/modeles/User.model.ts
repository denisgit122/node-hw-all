import { model, Schema } from "mongoose";

import { EGender, EUserStatus } from "../enums";
import { IUser, IUserModel } from "../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
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
    age: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      enum: EGender,
    },
    avatar: {
      type: String,
      required: false,
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

userSchema.methods = {
  nameWithAge() {
    return `${this.name} is ${this.age} years old`;
  },
};

userSchema.virtual("nameWithSurname").get(function () {
  return `${this.name} Piatov`;
});

userSchema.statics = {
  async findByName(name: string): Promise<IUser[]> {
    return this.find({ name });
  },
};
export const User = model<IUser, IUserModel>("user", userSchema);
