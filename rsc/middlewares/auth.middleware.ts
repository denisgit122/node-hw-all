import { NextFunction, Request, Response } from "express";

// import { isObjectIdOrHexString } from "mongoose";
import { ETokenType } from "../enums";
import { EActionTokenType } from "../enums/action-token-type-enum";
import { ApiError } from "../errors";
import { Action, Token } from "../modeles";
import { OldPassword } from "../modeles/Old.password.model";
import { passwordService, tokenService } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("not token", 401);
      }

      const tokenInfo = await Token.findOne({ accessToken });

      const jwtPayload = tokenService.checkToken(accessToken);

      if (!tokenInfo) {
        throw new ApiError("token not found", 401);
      }

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");
      if (!refreshToken) {
        throw new ApiError("not token", 401);
      }

      const jwtPayload = tokenService.checkToken(
        refreshToken,
        ETokenType.refresh
      );
      const tokenInfo = await Token.findOne({ refreshToken });

      if (!tokenInfo) {
        throw new ApiError("token not found", 401);
      }
      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  // public async checkActionForgotToken(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const actionToken = req.params.token;
  //     if (!actionToken) {
  //       throw new ApiError("not token", 401);
  //     }
  //
  //     const jwtPayload = tokenService.checkActionToken(
  //       actionToken,
  //       EActionTokenType.forgot
  //     );
  //     const tokenInfo = await Action.findOne({ actionToken });
  //
  //     if (!tokenInfo) {
  //       throw new ApiError("token not found", 401);
  //     }
  //     req.res.locals = { tokenInfo, jwtPayload };
  //     next();
  //   } catch (e) {}
  // }

  public checkActionToken(type: EActionTokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actionToken = req.params.token;
        if (!actionToken) {
          throw new ApiError("not token", 401);
        }

        const jwtPayload = tokenService.checkActionToken(actionToken, type);
        const tokenInfo = await Action.findOne({ actionToken });

        if (!tokenInfo) {
          throw new ApiError("token not valid", 401);
        }
        req.res.locals = { tokenInfo, jwtPayload };
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async checkOldPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req;
      const { tokenInfo } = req.res.locals;

      const oldPassword = await OldPassword.find({
        _user_id: tokenInfo._user_id,
      });
      if (!oldPassword) return next();

      await Promise.all(
        oldPassword.map(async (record) => {
          const isMatched = await passwordService.compare(
            body.password,
            record.password
          );
          if (isMatched) {
            throw new ApiError(
              "Your new password is the same as your old password",
              409
            );
          }
        })
      );
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddleware = new AuthMiddleware();
