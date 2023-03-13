"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const api_error_1 = require("../errors/api.error");
const Token_model_1 = require("../modeles/Token.model");
const User_model_1 = require("../modeles/User.model");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
class AuthService {
    async register(body) {
        try {
            const { password } = body;
            const hashedPassword = await password_service_1.passwordService.hash(password);
            await User_model_1.User.create({
                ...body,
                password: hashedPassword,
            });
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
    async login(credentials, user) {
        try {
            const isMatched = await password_service_1.passwordService.compare(credentials.password, user.password);
            if (!isMatched) {
                throw new api_error_1.ApiError("Invalid email or password", 400);
            }
            const tokenPair = token_service_1.tokenService.genereteTokenPair({
                name: user.name,
                id: user._id,
            });
            await Token_model_1.Token.create({
                _user_id: user._id,
                ...tokenPair,
            });
            return tokenPair;
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
}
exports.authService = new AuthService();
