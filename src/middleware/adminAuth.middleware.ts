import { NextFunction, Response } from "express";
import catchAsync from "./catchAsync.middleware";
import { AppError } from "../utils/error.middleware";
import { StatusCode } from "../utils/statusCode";
import { verifyToken } from "../services/token";
import { Request } from "../types/user";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {

}

// export const userAuth = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ message: "Unauthorized" });
//   const user = verifyToken(token);
//   req.user = user;
//   next();
// });

export const userAuth = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return next(new AppError('Unauthorized: Missing Authorization header', StatusCode.UNAUTHORIZED));
  }

  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return next(new AppError('Unauthorized: Invalid Authorization header format', StatusCode.UNAUTHORIZED));
  }

  const token = tokenParts[1];

  if (!token) {
    return next(new AppError('Unauthorized: Token is missing', StatusCode.UNAUTHORIZED));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err: any) {
    return next(new AppError('Unauthorized: Invalid Token', StatusCode.UNAUTHORIZED));
  }
});