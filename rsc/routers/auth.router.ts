import { Router } from "express";

import { authController } from "../controller";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/register",
  userMiddleware.isUserValidCreate,
  // search by email, email we give from body
  userMiddleware.getDyamicallyAndThrow("email"),
  authController.register
);

router.post(
  "/login",
  userMiddleware.isUserValidLogin,
  userMiddleware.getDyamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

router.post("/login");

export const authRouter = router;
