"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post("/register", middlewares_1.userMiddleware.isUserValidCreate, middlewares_1.userMiddleware.getDyamicallyAndThrow("email"), controller_1.authController.register);
router.post("/login", middlewares_1.userMiddleware.isUserValidLogin, middlewares_1.userMiddleware.getDyamicallyOrThrow("email"), controller_1.authController.login);
router.post("/refresh", middlewares_1.authMiddleware.checkRefreshToken, controller_1.authController.refresh);
router.post("/login");
exports.authRouter = router;
