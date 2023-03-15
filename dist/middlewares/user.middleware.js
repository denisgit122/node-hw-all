"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = require("../errors");
const modeles_1 = require("../modeles");
const valitors_1 = require("../valitors");
class UserMiddleware {
    async getByIdAndThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await modeles_1.User.findById(userId);
            if (!user) {
                throw new errors_1.ApiError("user not faund", 422);
            }
            res.locals = { user };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    getDyamicallyAndThrow(fildName, from = "body", dbField = fildName) {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fildName];
                const user = await modeles_1.User.findOne({ [dbField]: fieldValue });
                if (user) {
                    throw new errors_1.ApiError(`user with ${fildName} ${fieldValue} already exist  `, 409);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    getDyamicallyOrThrow(fildName, from = "body", dbField = fildName) {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fildName];
                const user = await modeles_1.User.findOne({ [dbField]: fieldValue });
                if (!user) {
                    throw new errors_1.ApiError(`user not found`, 422);
                }
                req.res.locals = { user };
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    async isUserValidCreate(req, res, next) {
        try {
            const { error, value } = valitors_1.UserValidator.createUser.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
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
                throw new errors_1.ApiError("Id not", 400);
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
                throw new errors_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValidLogin(req, res, next) {
        try {
            const { error } = valitors_1.UserValidator.loginUser.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isValidChangePassword(req, res, next) {
        try {
            const { error } = valitors_1.UserValidator.changeUserPassword.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
