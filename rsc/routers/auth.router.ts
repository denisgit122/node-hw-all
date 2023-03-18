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
  "/password/change",
  userMiddleware.isValidChangePassword,
  authMiddleware.checkAccessToken,
  authController.changePassword
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

//forgot pass
router.post(
  "/password/forgot",
  userMiddleware.getDyamicallyOrThrow("email"),
  authController.forgotPassword
);
router.put(
  "/password/forgot/:token",
  authMiddleware.checkActionForgotToken,
  authController.setForgotPassword
);

router.post("/login");

export const authRouter = router;
