"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Passord is required"],
    },
    gender: {
        type: String,
        enum: enums_1.EGender,
    },
    status: {
        type: String,
        enum: enums_1.EUserStatus,
        default: enums_1.EUserStatus.inactive,
    },
}, {
    versionKey: false,
    timestamp: true,
});
exports.User = (0, mongoose_1.model)("user", userSchema);
