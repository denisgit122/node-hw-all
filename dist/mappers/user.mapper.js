"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMapper = exports.UserMapper = void 0;
const configs_1 = require("../configs");
class UserMapper {
    toResponse(user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            age: user.age,
            avatar: user.avatar ? `${configs_1.confi.AWS_S3_BUCKET_URL}/${user.avatar}` : null,
        };
    }
    toManyResponse(users) {
        return users.map(this.toResponse);
    }
}
exports.UserMapper = UserMapper;
exports.userMapper = new UserMapper();
