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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const Joi = __importStar(require("joi"));
const constants_1 = require("../constants");
const enums_1 = require("../enums");
class UserValidator {
}
exports.UserValidator = UserValidator;
_a = UserValidator;
UserValidator.firstName = Joi.string().min(2).max(50).trim();
UserValidator.email = Joi.string()
    .regex(constants_1.regexConstants.EMAIL)
    .email()
    .lowercase()
    .trim();
UserValidator.password = Joi.string().regex(constants_1.regexConstants.PASSWORD);
UserValidator.gender = Joi.valid(...Object.values(enums_1.EGender));
UserValidator.createUser = Joi.object({
    name: _a.firstName.required(),
    email: _a.email.required(),
    password: _a.password.required(),
    gender: _a.gender.required(),
});
UserValidator.updateUser = Joi.object({
    name: _a.firstName,
    gender: _a.gender,
});
UserValidator.loginUser = Joi.object({
    email: _a.email.required(),
    password: _a.password.required(),
});
UserValidator.emailValidator = Joi.object({
    email: _a.email.required(),
});
UserValidator.changeUserPassword = Joi.object({
    oldPassword: _a.password.required(),
    newPassword: _a.password.required(),
});
