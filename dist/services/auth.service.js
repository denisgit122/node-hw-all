"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const email_constants_1 = require("../constants/email.constants");
const enums_1 = require("../enums");
const action_token_type_enum_1 = require("../enums/action-token-type-enum");
const errors_1 = require("../errors");
const modeles_1 = require("../modeles");
const Old_password_model_1 = require("../modeles/Old.password.model");
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
        try {
            const user = await modeles_1.User.findById(userId);
            const isMatched = await password_service_1.passwordService.compare(oldPassword, user.password);
            if (!isMatched) {
                throw new errors_1.ApiError("wrong old password", 400);
            }
            const hashedPassword = await password_service_1.passwordService.hash(newPassword);
            await modeles_1.User.updateOne({ _id: user._id }, { password: hashedPassword });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async forgotPassword(user) {
        try {
            const actionToken = token_service_1.tokenService.generateActionToken({ _id: user._id }, action_token_type_enum_1.EActionTokenType.forgot);
            await modeles_1.Action.create({
                actionToken,
                tokenType: action_token_type_enum_1.EActionTokenType.forgot,
                _user_id: user._id,
            });
            await email_service_1.emailService.sendMail(user.email, email_constants_1.EmailActions.FORGOT_PASSWORD, {
                token: actionToken,
            });
            await Old_password_model_1.OldPassword.create({ _user_id: user._id, password: user.password });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async setForgotPassword(password, id, token) {
        try {
            const hashedPassword = await password_service_1.passwordService.hash(password);
            await modeles_1.User.updateOne({ _id: id }, { password: hashedPassword });
            await modeles_1.Action.deleteOne({
                actionToken: token,
                tokenType: action_token_type_enum_1.EActionTokenType.forgot,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async sendActiveToken(user) {
        try {
            const actionToken = token_service_1.tokenService.generateActionToken({ _id: user._id }, action_token_type_enum_1.EActionTokenType.activate);
            await modeles_1.Action.create({
                actionToken,
                tokenType: action_token_type_enum_1.EActionTokenType.activate,
                _user_id: user._id,
            });
            await email_service_1.emailService.sendMail(user.email, email_constants_1.EmailActions.ACTIVATE, {
                token: actionToken,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async activate(userId) {
        try {
            await Promise.all([
                modeles_1.User.updateOne({ _id: userId }, { $set: { status: enums_1.EUserStatus.active } }),
                await modeles_1.Token.deleteMany({
                    _user_id: userId,
                    tokenType: action_token_type_enum_1.EActionTokenType.activate,
                }),
            ]);
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.authService = new AuthService();
