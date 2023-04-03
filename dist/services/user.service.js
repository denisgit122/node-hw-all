"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const errors_1 = require("../errors");
const modeles_1 = require("../modeles");
const S3_service_1 = require("./S3.service");
class UserService {
    getAll() {
        try {
            return modeles_1.User.find();
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getWhithPagination(query) {
        try {
            const user = await modeles_1.User.findById("64161a4d73c7ce2a400a4b12");
            console.log(user.nameWithSurname);
            const queryStr = JSON.stringify(query);
            const queryObj = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
            const { page = 1, limit = 5, sortedBy = "createdAt", ...searchObject } = queryObj;
            const skip = limit * (page - 1);
            const users = await modeles_1.User.find(searchObject)
                .limit(limit)
                .skip(skip)
                .sort(sortedBy);
            const usersTotalCount = await modeles_1.User.count();
            return {
                page: +page,
                itemsCount: usersTotalCount,
                perPage: +limit,
                itemsFound: users.length,
                data: users,
            };
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getById(id) {
        try {
            return modeles_1.User.findById(id);
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async uploadAvatar(file, user) {
        try {
            const filePath = await S3_service_1.s3Service.uploadPhoto(file, "user", user._id);
            if (!!user.avatar) {
                await S3_service_1.s3Service.deletePhoto(user.avatar);
            }
            return await modeles_1.User.findByIdAndUpdate(user._id, { avatar: filePath }, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async deleteAvatar(user) {
        try {
            if (!user.avatar) {
                throw new errors_1.ApiError("user dont have avatar", 422);
            }
            await S3_service_1.s3Service.deletePhoto(user.avatar);
            return await modeles_1.User.findByIdAndUpdate(user._id, { $unset: { avatar: user.avatar } }, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.userService = new UserService();
