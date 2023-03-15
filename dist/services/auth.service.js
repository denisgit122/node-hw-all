"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const email_constants_1 = require("../constants/email.constants");
const errors_1 = require("../errors");
const modeles_1 = require("../modeles");
const email_service_1 = require("./email.service");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
class AuthService {
    async register(body) {
        try {
            const { password } = body;
            const hashedPassword = await password_service_1.passwordService.hash(password);
            await modeles_1.User.create({
                ...body,
                password: hashedPassword,
            });
            await email_service_1.emailService.sendMail("yaholnykd@gmail.com ", email_constants_1.EmailActions.WELCOME);
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async login(credentials, user) {
        try {
            const isMatched = await password_service_1.passwordService.compare(credentials.password, user.password);
            if (!isMatched) {
                throw new errors_1.ApiError("Invalid email or password", 400);
            }
            const tokenPair = token_service_1.tokenService.genereteTokenPair({
                name: user.name,
                _id: user._id,
            });
            await modeles_1.Token.create({
                _user_id: user._id,
                ...tokenPair,
            });
            return tokenPair;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async refresh(tokenInfo, jwtPayload) {
        try {
            console.log(jwtPayload);
            const tokenPair = token_service_1.tokenService.genereteTokenPair({
                _id: jwtPayload._id,
                name: jwtPayload.name,
            });
            await Promise.all([
                modeles_1.Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
                modeles_1.Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
            ]);
            return tokenPair;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await modeles_1.User.findById(userId);
        const isMatched = await password_service_1.passwordService.compare(oldPassword, user.password);
        if (!isMatched) {
            throw new errors_1.ApiError("wrong old password", 400);
        }
        const hashedPassword = await password_service_1.passwordService.hash(newPassword);
        await modeles_1.User.updateOne({ _id: user._id }, { password: hashedPassword });
    }
}
exports.authService = new AuthService();
