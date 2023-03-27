import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      trim: true,
      lowercase: true,
      require: true,
    },
    model: {
      type: String,
      trim: true,
      lowercase: true,
      require: true,
    },
    year: {
      type: Number,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      require: true,
      ref: User,
    },
  },
  {
    versionKey: false,
    timestamp: true,
  }
);
export const Car = model("car", carSchema);
