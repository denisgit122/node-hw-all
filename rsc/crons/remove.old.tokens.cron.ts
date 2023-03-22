import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EmailActions } from "../constants/email.constants";
import { Token, User } from "../modeles";
import { emailService } from "../services/email.service";

dayjs.extend(utc);
const tokenRemover = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "month");

  const unvisitedUsers = await Token.find({
    createdAt: { $lte: previousMonth },
  });
  const ids = unvisitedUsers.map((record) => record._user_id);
  const users = await User.find({ _id: { $in: ids } });
  const emails = users.map((u) => u.email);

  return emailService.sendMail(emails, EmailActions.RENIDER);

  // await Promise.all(
  //   users.map(async ({ email }) => {
  //     return emailService.sendMail(email, EmailActions.RENIDER);
  //   })
  // );

  await Token.deleteMany({ createdAt: { $lte: previousMonth } });
};

export const removeOldToken = new CronJob("0 0 * * *", tokenRemover);
