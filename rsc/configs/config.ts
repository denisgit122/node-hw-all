import { config } from "dotenv";

config();
export const confi = {
  PORT: process.env.PORT || 5001,
  DB_URL: process.env.DB_URL || "iojoio",
};
