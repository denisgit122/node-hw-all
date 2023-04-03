import { Router } from "express";

import { userController } from "../controller";
import { authMiddleware, fileMiddleware } from "../middlewares";
import { userMiddleware } from "../middlewares";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getAll);

router.post("/", userMiddleware.isUserValidCreate, userController.create);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdAndThrow,
  userController.getById
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isUserValidUpdate,
  userMiddleware.isUserIdValid,
  userController.update
);

router.delete(
  "/:userId",
  userMiddleware.isUserIdValid,
  userController.delete,
  authMiddleware.checkAccessToken
);

router.put(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  fileMiddleware.isAvatarValid,
  userMiddleware.getByIdAndThrow,
  userController.uploadAvatar
);
router.delete(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdAndThrow,
  userController.deleteAvatar
);

export const userRouter = router;
