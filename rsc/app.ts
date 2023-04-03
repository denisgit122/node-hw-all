import express, { Application, NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as http from "http";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";

import { confi } from "./configs";
import { cronRunner } from "./crons";
import { authRouter, carRouter } from "./routers";
import { userRouter } from "./routers";
import { IError } from "./types";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // cors вказуємо кого ми можемо впускати на наш сервер
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  //віддаємо лише одному сокету
  // socket.emit("message", { message: "hello" });
  // // для того щоб сокет отримали всі клієнти потрібно заертатися до іо.ee
  // io.emit("user:connected", { message: "User connected" });
  // //   виправляння всім крім одного
  //  socket.broadcast.emit("user:connected", { message: "User connected" });

  socket.on("message: send", (text) => {
    io.emit("message:get", ` ${text}`);
  });
});

app.use(express.json());
app.use(fileUploader());
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

server.listen(confi.PORT, () => {
  mongoose.connect(confi.DB_URL);
  cronRunner();
  console.log(`Server has started on PORT  🚀🚀🚀`);
});
