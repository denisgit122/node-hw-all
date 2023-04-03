"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMiddleware = void 0;
const configs_1 = require("../configs");
const errors_1 = require("../errors");
class FileMiddleware {
    isAvatarValid(req, res, next) {
        try {
            const { avatar } = req.files;
            if (!req.files) {
                throw new errors_1.ApiError("No file upload", 400);
            }
            if (Array.isArray(avatar)) {
                throw new errors_1.ApiError("You can upload only photo", 400);
            }
            const { size, mimetype, name } = avatar;
            if (size > configs_1.avatarConfig.MAX_SIZE) {
                throw new errors_1.ApiError(`File ${name} is to big`, 400);
            }
            if (!configs_1.avatarConfig.MIMETYPES.includes(mimetype)) {
                throw new errors_1.ApiError(`File ${name} has invalid format`, 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.fileMiddleware = new FileMiddleware();
