import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { OldPassword } from "../modeles/Old.password.model";

dayjs.extend(utc);
const oldPasswordRemover = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "year");
  await OldPassword.deleteMany({ createdAt: { $lte: previousMonth } });
};

export const removeOldPasswords = new CronJob("0 0 * * *", oldPasswordRemover);
