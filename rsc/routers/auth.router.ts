import { Router } from "express";

import { authController } from "../controller";
import { EActionTokenType } from "../enums/action-token-type-enum";
import { authMiddleware, userMiddleware } from "../middlewares";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../valitors";

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
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDyamicallyOrThrow("email"),
  authController.forgotPassword
);
router.put(
  "/password/forgot/:token",
  authMiddleware.checkActionToken(EActionTokenType.forgot),
  authMiddleware.checkOldPassword,
  authController.setForgotPassword
);

router.post(
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDyamicallyOrThrow("email"),
  authController.sendActiveToken
);
router.put(
  "/activate/:token",
  authMiddleware.checkActionToken(EActionTokenType.activate),
  authController.activate
);

router.post("/login");

export const authRouter = router;
