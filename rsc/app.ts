import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { confi } from "./configs";
import { cronRunner } from "./crons";
import { authRouter, carRouter } from "./routers";
import { userRouter } from "./routers";
import { IError } from "./types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/cars", carRouter);

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
  cronRunner();
  console.log(`Server has started on PORT  🚀🚀🚀`);
});
