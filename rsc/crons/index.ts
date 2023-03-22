import { removeOldPasswords } from "./remove.old.password.cron";
import { removeOldToken } from "./remove.old.tokens.cron";

export const cronRunner = () => {
  removeOldToken.start();
  removeOldPasswords.start();
};
