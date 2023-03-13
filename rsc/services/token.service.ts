import * as jwt from "jsonwebtoken";

import { tokenConstants } from "../constants/token.constants";
import { ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public genereteTokenPair(payload: ITokenPayload): ITokenPair {
    //секретне слово щоб ми потвм могли розуміти що цей токен видуманий саме нами щоб його валідувати други йпараметр
    // in expiresIn we put have many time token was alive
    const accessToken = jwt.sign(payload, tokenConstants.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, tokenConstants.REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
export const tokenService = new TokenService();
