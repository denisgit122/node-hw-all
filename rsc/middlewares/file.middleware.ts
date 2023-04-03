import { NextFunction, Request, Response } from "express";

import { avatarConfig } from "../configs";
import { ApiError } from "../errors";

class FileMiddleware {
  public isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { avatar } = req.files;

      if (!req.files) {
        throw new ApiError("No file upload", 400);
      }
      if (Array.isArray(avatar)) {
        throw new ApiError("You can upload only photo", 400);
      }

      const { size, mimetype, name } = avatar;

      if (size > avatarConfig.MAX_SIZE) {
        throw new ApiError(`File ${name} is to big`, 400);
      }

      if (!avatarConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiError(`File ${name} has invalid format`, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
