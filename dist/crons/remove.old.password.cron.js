"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOldPasswords = void 0;
const cron_1 = require("cron");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const Old_password_model_1 = require("../modeles/Old.password.model");
dayjs_1.default.extend(utc_1.default);
const oldPasswordRemover = async () => {
    const previousMonth = (0, dayjs_1.default)().utc().subtract(1, "year");
    await Old_password_model_1.OldPassword.deleteMany({ createdAt: { $lte: previousMonth } });
};
exports.removeOldPasswords = new cron_1.CronJob("0 0 * * *", oldPasswordRemover);
