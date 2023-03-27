"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carMiddleware = void 0;
const errors_1 = require("../errors");
const Car_model_1 = require("../modeles/Car.model");
class CarMiddleware {
    async getByIdAndThrow(req, res, next) {
        try {
            const { carId } = req.params;
            const car = await Car_model_1.Car.findById(carId);
            if (!car) {
                throw new errors_1.ApiError("car not faund", 422);
            }
            res.locals.car = car;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carMiddleware = new CarMiddleware();
