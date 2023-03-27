"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = require("../errors");
const Car_model_1 = require("../modeles/Car.model");
class CarService {
    async getById(userId, carId) {
        try {
            const result = await Car_model_1.Car.aggregate([
                {
                    $match: {
                        _id: carId,
                        user: new mongoose_1.Types.ObjectId(userId),
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                    },
                },
            ]);
            return result[0];
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async create(data, userId) {
        try {
            return Car_model_1.Car.create({ ...data, user: new mongoose_1.Types.ObjectId(userId) });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.carService = new CarService();
