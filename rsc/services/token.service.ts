import * as jwt from "jsonwebtoken";

class TokenService {
  public async genereteTokenPair(payload: Record<string, any>) {
    //секретне слово щоб ми потвм могли розуміти що цей токен видуманий саме нами щоб його валідувати други йпараметр
    // in expiresIn we put have many time token was alive
    const accessToken = jwt.sign(payload, "JWT_ACCESS_SECRET", {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, "JWT_REFRESH_SECRET", {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
export const tokenService = new TokenService();
