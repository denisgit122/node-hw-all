import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { confi } from "./configs/config";
import { userRouter } from "./routers/user.router";
import { IError } from "./types/common.type";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  console.log(err);

  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(confi.PORT, () => {
  mongoose.connect(confi.DB_URL);
  console.log(`Server has started on PORT  🚀🚀🚀`);
});
