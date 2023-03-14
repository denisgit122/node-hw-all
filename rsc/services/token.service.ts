import * as jwt from "jsonwebtoken";

import { confi } from "../configs";
import { ETokenType } from "../enums";
import { ApiError } from "../errors";
import { ITokenPair, ITokenPayload } from "../types";

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
}
export const tokenService = new TokenService();
