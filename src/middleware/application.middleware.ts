import { NextFunction, Response } from "express";
import { Request } from "../types/user";
import catchAsync from "./catchAsync.middleware";
import { StatusCode } from "../utils/statusCode";
import { AppError } from "../utils/error.middleware";

export const applicationAuth = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  // console.log("Headers", req.headers);
  const authHeader = req.headers['applicationid'];

  if (!authHeader) {
    return next(new AppError('Unauthorized: Missing Authorization header', StatusCode.UNAUTHORIZED));
  }

  req.applicationId = authHeader;
  next();
});