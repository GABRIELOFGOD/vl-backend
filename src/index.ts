import express, { Application, NextFunction, Request, Response } from "express";
import { FRONTEND_URL, PORT } from "./config/env";
import morgan from "morgan";
import cors from "cors";
import generalRoute from "./route/general.route";
import dbConfig from "./config/database.config";
import dataSourceInitializer from "./utils/dataSourseInitializer";
import { AppError, globalErrorHandler } from "./utils/error.middleware";
import userRouter from "./route/user.route";
import surahRoute from "./route/surah.route";
import applicationRoute from "./route/application.route";

const app: Application = express();
dbConfig();

// ============= MIDDLEWARES ============= //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.send("Welcome to verse of light server");
});

dataSourceInitializer();

app.use("/api/v1/general", generalRoute);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/surah", surahRoute);
app.use("/api/v1/application", applicationRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`RUNNING SERVER ON http://localhost:${PORT}`);
});