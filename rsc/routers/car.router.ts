import { Router } from "express";

import { carController } from "../controller";
import { authMiddleware } from "../middlewares";
import { carMiddleware } from "../middlewares";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CarValidator } from "../valitors";

const router = Router();

router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CarValidator.createCar),
  carController.create
);

router.get(
  "/:carId",
  authMiddleware.checkAccessToken,
  // commonMiddleware.isIdValid("CarId"),
  carMiddleware.getByIdAndThrow,
  carController.getById
);

router.put(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.updateUser),
  carController.update
);

router.delete(
  "/:carId",
  carController.delete,
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdAndThrow
);

export const carRouter = router;
