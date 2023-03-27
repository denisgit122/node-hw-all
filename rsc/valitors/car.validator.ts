import * as Joi from "joi";

export class CarValidator {
  //перевірка
  private static brand = Joi.string().min(2).max(15).trim().lowercase();
  private static model = Joi.string().min(2).max(15).trim().lowercase();
  private static year = Joi.number().min(1970).max(new Date().getFullYear());
  // / в regex записуємо регулярку
  static createCar = Joi.object({
    brand: this.brand.required(),
    model: this.model.required(),
    year: this.year.required(),
  });
  static updateUser = Joi.object({
    brand: this.brand,
    model: this.model,
    year: this.year,
  });
}
