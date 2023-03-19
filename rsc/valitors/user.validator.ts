import * as Joi from "joi";

import { regexConstants } from "../constants";
import { EGender } from "../enums";

export class UserValidator {
  //перевірка
  private static firstName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .email()
    .lowercase()
    .trim();
  // / в regex записуємо регулярку
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGender));

  static createUser = Joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    gender: this.gender.required(),
  });
  static updateUser = Joi.object({
    name: this.firstName,
    gender: this.gender,
  });

  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static emailValidator = Joi.object({
    email: this.email.required(),
  });

  static changeUserPassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
}
