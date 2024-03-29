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
exports.CarValidator = void 0;
const Joi = __importStar(require("joi"));
class CarValidator {
}
exports.CarValidator = CarValidator;
_a = CarValidator;
CarValidator.brand = Joi.string().min(2).max(15).trim().lowercase();
CarValidator.model = Joi.string().min(2).max(15).trim().lowercase();
CarValidator.year = Joi.number().min(1970).max(new Date().getFullYear());
CarValidator.createCar = Joi.object({
    brand: _a.brand.required(),
    model: _a.model.required(),
    year: _a.year.required(),
});
CarValidator.updateUser = Joi.object({
    brand: _a.brand,
    model: _a.model,
    year: _a.year,
});
