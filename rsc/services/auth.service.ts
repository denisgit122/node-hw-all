import { EmailActions } from "../constants/email.constants";
import { EActionTokenType } from "../enums/action-token-type-enum";
import { ApiError } from "../errors";
import { Action, Token, User } from "../modeles";
import { ICredentials, ITokenPair, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      //  нам треба захешувати пароль робимо новий сервіс
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });
      await emailService.sendMail("yaholnykd@gmail.com ", EmailActions.WELCOME);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      //  перевірка чи зменшилися паролі
      //якщо ввули правильно лише пароль чи пошту викид помилку
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 400);
      }
      // якщо ввели все правельно ви
      const tokenPair = tokenService.genereteTokenPair({
        name: user.name,
        _id: user._id,
      });
      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      console.log(jwtPayload);
      const tokenPair = tokenService.genereteTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });
      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await User.findById(userId);

      const isMatched = await passwordService.compare(
        oldPassword,
        user.password
      );
      if (!isMatched) {
        throw new ApiError("wrong old password", 400);
      }
      const hashedPassword = await passwordService.hash(newPassword);
      await User.updateOne({ _id: user._id }, { password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.forgot
      );
      await Action.create({
        actionToken,
        tokenType: EActionTokenType.forgot,
        _user_id: user._id,
      });
      await emailService.sendMail(user.email, EmailActions.FORGOT_PASSWORD, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async setForgotPassword(password: string, id: string): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(password);

      await User.updateOne({ _id: id }, { password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const authService = new AuthService();
