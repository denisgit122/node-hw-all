"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const mongoose_1 = require("mongoose");
const api_error_1 = require("../errors/api.error");
const User_model_1 = require("../modeles/User.model");
const valitors_1 = require("../valitors");
class UserMiddleware {
    async getByIdAndThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User_model_1.User.findById(userId);
            if (!user) {
                throw new api_error_1.ApiError("user not faund", 422);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValidCreate(req, res, next) {
        try {
            const { error, value } = valitors_1.UserValidator.createUser.validate(req.body);
            if (error) {
                throw new api_error_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserIdValid(req, res, next) {
        try {
            if (!(0, mongoose_1.isObjectIdOrHexString)(req.params.userId)) {
                throw new api_error_1.ApiError("Id not", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValidUpdate(req, res, next) {
        try {
            const { error, value } = valitors_1.UserValidator.updateUser.validate(req.body);
            if (error) {
                throw new api_error_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
