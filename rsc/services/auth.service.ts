import { ApiError } from "../errors/api.error";
import { User } from "../modeles/User.model";
import { IUser } from "../types/User.types";
import { passwordService } from "./password.service";

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
}
export const authService = new AuthService();
