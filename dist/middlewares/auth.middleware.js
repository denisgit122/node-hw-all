"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const enums_1 = require("../enums");
const errors_1 = require("../errors");
const modeles_1 = require("../modeles");
const services_1 = require("../services");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new errors_1.ApiError("not token", 401);
            }
            const tokenInfo = await modeles_1.Token.findOne({ accessToken });
            const jwtPayload = services_1.tokenService.checkToken(accessToken);
            if (!tokenInfo) {
                throw new errors_1.ApiError("token not found", 401);
            }
            req.res.locals = { tokenInfo, jwtPayload };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get("Authorization");
            if (!refreshToken) {
                throw new errors_1.ApiError("not token", 401);
            }
            const jwtPayload = services_1.tokenService.checkToken(refreshToken, enums_1.ETokenType.refresh);
            const tokenInfo = await modeles_1.Token.findOne({ refreshToken });
            if (!tokenInfo) {
                throw new errors_1.ApiError("token not found", 401);
            }
            req.res.locals = { tokenInfo, jwtPayload };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    checkActionToken(type) {
        return async (req, res, next) => {
            try {
                const actionToken = req.params.token;
                if (!actionToken) {
                    throw new errors_1.ApiError("not token", 401);
                }
                const jwtPayload = services_1.tokenService.checkActionToken(actionToken, type);
                const tokenInfo = await modeles_1.Action.findOne({ actionToken });
                if (!tokenInfo) {
                    throw new errors_1.ApiError("token not valid", 401);
                }
                req.res.locals = { tokenInfo, jwtPayload };
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.authMiddleware = new AuthMiddleware();
