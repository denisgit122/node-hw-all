import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Car } from "../modeles/Car.model";
import { ICar } from "../types";

class CarService {
  public async getById(userId: string, carId: string): Promise<ICar> {
    try {
      //можна зробити за доп populate але воно не завжди буде працювати
      // return Car.findById(carId).populate("user");
      //  як замінити populate
      const result = await Car.aggregate([
        {
          $match: {
            _id: carId,
            user: new Types.ObjectId(userId),
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
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: ICar, userId: string): Promise<any> {
    try {
      return Car.create({ ...data, user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const carService = new CarService();
