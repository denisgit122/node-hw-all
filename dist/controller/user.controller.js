"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const modeles_1 = require("../modeles");
const services_1 = require("../services");
class UserController {
    async getAll(req, res, next) {
        try {
            const users = await services_1.userService.getWhithPagination(req.query);
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { user } = res.locals;
            return res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const body = req.body;
            const user = await modeles_1.User.create(body);
            return res.status(201).json({
                message: "okk",
                data: user,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { userId } = req.params;
            const updatedUser = req.body;
            const updateOne = await modeles_1.User.findByIdAndUpdate({ _id: userId }, { ...updatedUser }, { new: true });
            return res.status(201).json({
                message: "User updated",
                data: updateOne,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId } = req.params;
            await modeles_1.User.deleteOne({ _id: userId });
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
