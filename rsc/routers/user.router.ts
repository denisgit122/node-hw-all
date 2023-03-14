import { Router } from "express";

import { userController } from "../controller";
import { authMiddleware } from "../middlewares";
import { userMiddleware } from "../middlewares";

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

export const userRouter = router;
