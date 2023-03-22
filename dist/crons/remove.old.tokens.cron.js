"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOldToken = void 0;
const cron_1 = require("cron");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const email_constants_1 = require("../constants/email.constants");
const modeles_1 = require("../modeles");
const email_service_1 = require("../services/email.service");
dayjs_1.default.extend(utc_1.default);
const tokenRemover = async () => {
    const previousMonth = (0, dayjs_1.default)().utc().subtract(1, "month");
    const unvisitedUsers = await modeles_1.Token.find({
        createdAt: { $lte: previousMonth },
    });
    const ids = unvisitedUsers.map((record) => record._user_id);
    const users = await modeles_1.User.find({ _id: { $in: ids } });
    const emails = users.map((u) => u.email);
    return email_service_1.emailService.sendMail(emails, email_constants_1.EmailActions.RENIDER);
    await modeles_1.Token.deleteMany({ createdAt: { $lte: previousMonth } });
};
exports.removeOldToken = new cron_1.CronJob("0 0 * * *", tokenRemover);
