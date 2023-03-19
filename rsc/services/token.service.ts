import * as jwt from "jsonwebtoken";

import { confi } from "../configs";
import { ETokenType } from "../enums";
import { EActionTokenType } from "../enums/action-token-type-enum";
import { ApiError } from "../errors";
import { IActionTokenPayload, ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public genereteTokenPair(payload: ITokenPayload): ITokenPair {
    //секретне слово щоб ми потвм могли розуміти що цей токен видуманий саме нами щоб його валідувати други йпараметр
    // in expiresIn we put have many time token was alive
    const accessToken = jwt.sign(payload, confi.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, confi.REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  public checkToken(
    token: string,
    tokenType = ETokenType.access
  ): ITokenPayload {
    try {
      let secret = "";
      switch (tokenType) {
        case ETokenType.access:
          secret = confi.ACCESS_SECRET;
          break;
        case ETokenType.refresh:
          secret = confi.REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token nor valid", 401);
    }
  }
  public generateActionToken(
    payload: IActionTokenPayload,
    tokenType: EActionTokenType
  ): string {
    let secret = "";
    switch (tokenType) {
      case EActionTokenType.activate:
        secret = confi.ACTIVATE_SECRET;
        break;
      case EActionTokenType.forgot:
        secret = confi.FORGOT_SECRET;
        break;
    }
    return jwt.sign(payload, secret, { expiresIn: "7d" });
  }

  // public checkActionToken(token: string, tokenType: EActionTokenType) {
  //   try {
  //     let secret = "";
  //
  //     switch (tokenType) {
  //       case EActionTokenType.forgot:
  //         secret = confi.FORGOT_SECRET;
  //         break;
  //       case EActionTokenType.activate:
  //         secret = confi.ACTIVATE_SECRET;
  //         break;
  //     }
  //     return jwt.verify(token, secret) as IActionTokenPayload;
  //   } catch (e) {
  //     throw new ApiError("Token nor valid", 401);
  //   }
  // }

  public checkActionToken(token: string, tokenType: EActionTokenType) {
    try {
      let secret = "";

      switch (tokenType) {
        case EActionTokenType.forgot:
          secret = confi.FORGOT_SECRET;
          break;
        case EActionTokenType.activate:
          secret = confi.ACTIVATE_SECRET;
          break;
      }

      return jwt.verify(token, secret) as IActionTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}
export const tokenService = new TokenService();
