"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
class AuthController {
    async register(req, res, next) {
        try {
            await services_1.authService.register(req.body);
            res.sendStatus(201);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { user } = req.res.locals;
            const tokenPair = await services_1.authService.login({ email, password }, user);
            return res.status(200).json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { tokenInfo, jwtPayload } = req.res.locals;
            const tokenPair = await services_1.authService.refresh(tokenInfo, jwtPayload);
            return res.status(200).json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
