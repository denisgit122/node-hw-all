"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenConstants = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.tokenConstants = {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};
