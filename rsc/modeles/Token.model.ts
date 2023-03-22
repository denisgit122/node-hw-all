import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";
// потім коли ми будемо на наступній лекції закривати якийсь едпоінт зробити його не доступним для
// всіх ми будемо писатти мідлевару яка буде валідувати ексес токен в 2 етапи валідуємо токен секретним словом
// яким ми його підписували і потім ми перевіряємо чи є токен в бд

const tokensSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Token = model("Token", tokensSchema);
