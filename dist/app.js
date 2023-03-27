"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = require("./configs");
const crons_1 = require("./crons");
const routers_1 = require("./routers");
const routers_2 = require("./routers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", routers_2.userRouter);
app.use("/auth", routers_1.authRouter);
app.use("/cars", routers_1.carRouter);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.log(err);
    return res.status(status).json({
        message: err.message,
        status,
    });
});
app.listen(configs_1.confi.PORT, () => {
    mongoose_1.default.connect(configs_1.confi.DB_URL);
    (0, crons_1.cronRunner)();
    console.log(`Server has started on PORT  🚀🚀🚀`);
});
