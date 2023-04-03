import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";
import { User } from "../modeles";
import { IRequest } from "../types";
import { UserValidator } from "../valitors";

class UserMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        throw new ApiError("user not faund", 422);
      }
      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
  //створює одну валідацію мідлварку яка буде мітити декілька
  // з бази даних динамічно витягуємо користувача  і у випадку якщо ми його знайдемо  викидуємо пеану помилку
  //і тепер ми не просто кидаємо мідл варку на посилання ми будемо викдикати функцію

  public getDyamicallyAndThrow(
    fildName: string,
    // from && dbField default value
    from = "body",
    dbField = fildName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        //  логіка
        // fieldValue це по тому по чому шукаємо

        const fieldValue = req[from][fildName];
        //  шукаємо user
        const user = await User.findOne({ [dbField]: fieldValue });
        //якщо користувача знайшли то викидуємо ерор
        if (user) {
          throw new ApiError(
            `user with ${fildName} ${fieldValue} already exist  `,
            409
          );
        }
        //  if okk
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public getDyamicallyOrThrow(
    fildName: string,
    // from && dbField default value
    from = "body",
    dbField = fildName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        //  логіка
        // fieldValue це по тому по чому шукаємо

        const fieldValue = req[from][fildName];
        //  шукаємо user
        const user = await User.findOne({ [dbField]: fieldValue });
        //якщо користувача ne знайшли то викидуємо ерор
        if (!user) {
          throw new ApiError(`user not found`, 422);
        }
        //  if okk
        req.res.locals = { user };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  // /validators
  public async isUserValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUser.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserIdValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userId)) {
        throw new ApiError("Id not", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.updateUser.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.loginUser.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isValidChangePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.changeUserPassword.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const userMiddleware = new UserMiddleware();
