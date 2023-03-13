"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async register(req, res, next) {
        try {
            await auth_service_1.authService.register(req.body);
            res.sendStatus(201);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = req.res.locals;
            const tokenPair = await auth_service_1.authService.login({
                email,
                password,
            }, user);
            return res.status(200).json(tokenPair);
        }
        catch (e) { }
    }
}
exports.authController = new AuthController();
