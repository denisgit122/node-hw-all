"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const email_templates_1 = __importDefault(require("email-templates"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path = __importStar(require("path"));
const configs_1 = require("../configs");
const email_constants_1 = require("../constants/email.constants");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: configs_1.confi.NO_REPLY_EMAIL,
                pass: configs_1.confi.NO_REPLY_PASSWORD,
            },
        });
        this.templateParcer = new email_templates_1.default({
            views: {
                root: path.join(process.cwd(), "rsc", "statics"),
                options: {
                    extension: "hbs",
                },
            },
            juice: true,
            juiceResources: {
                webResources: {
                    relativeTo: path.join(process.cwd(), "src", "statics", "css"),
                },
            },
        });
    }
    async sendMail(email, emailAction) {
        const templateInfo = email_constants_1.allTemplates[emailAction];
        const html = await this.templateParcer.render(templateInfo.templateName);
        return this.transporter.sendMail({
            from: "no reply",
            to: email,
            subject: templateInfo.subject,
            html,
        });
    }
}
exports.emailService = new EmailService();
