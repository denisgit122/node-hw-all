import { NextFunction, Request, Response } from "express";

import { User } from "../modeles/User.model";
import { userService } from "../services/user.service";
import { IMessage } from "../types/common.type";
import { ICommontResponse } from "../types/common.type";
import { IUser } from "../types/User.types";

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
      const { userId } = req.params;

      const user = await userService.getById(userId);
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

      const updateOne = await User.updateOne(
        { _id: userId },
        { ...updatedUser }
      );
      return res.status(200).json({
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
  ): Promise<Response<IMessage>> {
    try {
      const { userId } = req.params;
      await User.deleteOne({ _id: userId });

      return res.status(200).json({
        message: "User deleted",
      });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
