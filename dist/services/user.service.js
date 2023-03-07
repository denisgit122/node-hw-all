"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = require("../errors/api.error");
const User_model_1 = require("../modeles/User.model");
class UserService {
    getAll() {
        try {
            return User_model_1.User.find();
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
    async getById(id) {
        try {
            return User_model_1.User.findById(id);
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
}
exports.userService = new UserService();
