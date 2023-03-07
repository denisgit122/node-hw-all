import { Router } from "express";

import { userController } from "../controller/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);

router.post("/", userMiddleware.isUserValidCreate, userController.create);

router.get(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdAndThrow,
  userController.getById
);

router.put("/:userId", userMiddleware.isUserIdValid, userController.update);

router.delete("/:userId", userMiddleware.isUserIdValid, userController.delete);

export const userRouter = router;
