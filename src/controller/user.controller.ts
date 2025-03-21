import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator"; // Import the validation function
import { plainToInstance } from "class-transformer";
import catchAsync from "../middleware/catchAsync.middleware";
import { UserRegisterDto } from "../dtos/userRegister.dto";
import { userRepository } from "../utils/repositories";
import { AppError } from "../utils/error.middleware";
import { StatusCode } from "../utils/statusCode";

export const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Convert request body to UserRegisterDto instance
  const userRegisterDto = plainToInstance(UserRegisterDto, req.body);

  // Validate the DTO
  const errors = await validate(userRegisterDto);
  if (errors.length > 0) {
    return next(new AppError(errors.map(err => Object.values(err.constraints || {})).join(", "), StatusCode.BAD_REQUEST));
  }

  const userExists = await userRepository.findOne({
    where: { email: userRegisterDto.email }
  });

  if (userExists) return next(new AppError("User Exists, use another email account", StatusCode.CONFLICT));

  const newUser = userRepository.create(userRegisterDto);
  await userRepository.save(newUser);

  res.status(StatusCode.CREATED).json({
    message: "User registered successfully",
    newUser
  });
});
