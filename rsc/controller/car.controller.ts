import { NextFunction, Request, Response } from "express";

import { User } from "../modeles";
import { Car } from "../modeles/Car.model";
import { carService } from "../services";
import { ICar, ICommontResponse, ITokenPayload } from "../types";

class CarController {
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { car, jwtPayload } = res.locals;
      const result = await carService.getById(jwtPayload._id, car._id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommontResponse<ICar>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const car = await carService.create(req.body, _id);
      return res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommontResponse<ICar>>> {
    try {
      const { carId } = req.params;
      const updatedCar = req.body;

      const updateOne = await Car.findByIdAndUpdate(
        carId,
        { ...updatedCar },
        { new: true }
      );
      return res.status(201).json({
        message: "Car updated",
        data: updateOne,
      });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { carId } = req.params;
      await User.deleteOne({ _id: carId });

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
