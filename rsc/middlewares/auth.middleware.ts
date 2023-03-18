import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums";
import { EActionTokenType } from "../enums/action-token-type-enum";
import { ApiError } from "../errors";
import { Action, Token } from "../modeles";
import { tokenService } from "../services";

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
  public async checkActionForgotToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const actionToken = req.params.token;
      if (!actionToken) {
        throw new ApiError("not token", 401);
      }

      const jwtPayload = tokenService.checkActionToken(
        actionToken,
        EActionTokenType.forgot
      );
      const tokenInfo = await Action.findOne({ actionToken });

      if (!tokenInfo) {
        throw new ApiError("token not found", 401);
      }
      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {}
  }
}
export const authMiddleware = new AuthMiddleware();
