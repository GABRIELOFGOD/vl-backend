import { NextFunction, Response } from "express";
import { Request } from "../types/user";
import catchAsync from "./catchAsync.middleware";
import { StatusCode } from "../utils/statusCode";
import { AppError } from "../utils/error.middleware";

export const applicationAuth = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers['applicationId'];

  if (!authHeader) {
    return next(new AppError('Unauthorized: Missing Authorization header', StatusCode.UNAUTHORIZED));
  }

  req.applicationId = authHeader;
});