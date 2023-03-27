"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = void 0;
const modeles_1 = require("../modeles");
const Car_model_1 = require("../modeles/Car.model");
const services_1 = require("../services");
class CarController {
    async getById(req, res, next) {
        try {
            const { car, jwtPayload } = res.locals;
            const result = await services_1.carService.getById(jwtPayload._id, car._id);
            return res.json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const { _id } = req.res.locals.jwtPayload;
            const car = await services_1.carService.create(req.body, _id);
            return res.status(201).json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { carId } = req.params;
            const updatedCar = req.body;
            const updateOne = await Car_model_1.Car.findByIdAndUpdate(carId, { ...updatedCar }, { new: true });
            return res.status(201).json({
                message: "Car updated",
                data: updateOne,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { carId } = req.params;
            await modeles_1.User.deleteOne({ _id: carId });
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carController = new CarController();
