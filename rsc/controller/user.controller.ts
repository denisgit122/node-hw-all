import { NextFunction, Request, Response } from "express";

import { User } from "../modeles";
import { userService } from "../services";
import { ICommontResponse } from "../types";
import { IUser } from "../types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      // const { userId } = req.params;
      const { user } = res.locals;
      // const user = await userService.getById(userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommontResponse<IUser>>> {
    try {
      const body = req.body;
      const user = await User.create(body);
      return res.status(201).json({
        message: "okk",
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommontResponse<IUser>>> {
    try {
      const { userId } = req.params;
      const updatedUser = req.body;

      const updateOne = await User.findByIdAndUpdate(
        { _id: userId },
        { ...updatedUser },
        { new: true }
      );
      return res.status(201).json({
        message: "User updated",
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
      const { userId } = req.params;
      await User.deleteOne({ _id: userId });

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
