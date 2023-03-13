import { ApiError } from "../errors/api.error";
import { Token } from "../modeles/Token.model";
import { User } from "../modeles/User.model";
import { ITokenPair, IUser } from "../types";
import { ICredentials } from "../types/auth.types";
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
        id: user._id,
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
}
export const authService = new AuthService();
