import { config } from "dotenv";

config();
export const confi = {
  PORT: process.env.PORT || 5001,
  DB_URL: process.env.DB_URL || "iojoio",

  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "aa",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "bbb",

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
};
