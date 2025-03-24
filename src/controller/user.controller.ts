import { NextFunction, Response } from "express";
import { validate } from "class-validator"; // Import the validation function
import { plainToInstance } from "class-transformer";
import catchAsync from "../middleware/catchAsync.middleware";
import { UserRegisterDto } from "../dtos/userRegister.dto";
import { userRepository } from "../utils/repositories";
import { AppError } from "../utils/error.middleware";
import { StatusCode } from "../utils/statusCode";
import { UserLoginDto } from "../dtos/userLogin.dto";
import { comparePassword, encryptPassword } from "../services/password";
import { createToken } from "../services/token";
import { Request } from "../types/user";

export const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Convert request body to UserRegisterDto instance
  const userRegisterDto = plainToInstance(UserRegisterDto, req.body);

  // Validate the DTO
  const errors = await validate(userRegisterDto);
  if (errors.length > 0) return next(new AppError(errors.map(err => Object.values(err.constraints || {})).join(", "), StatusCode.BAD_REQUEST));

  const userExists = await userRepository.findOne({
    where: { email: userRegisterDto.email }
  });

  if (userExists) return next(new AppError("User Exists, use another email account", StatusCode.CONFLICT));

  const hashedPassword = await encryptPassword(userRegisterDto.password);
  userRegisterDto.password = hashedPassword;

  const newUser = userRepository.create(userRegisterDto);
  await userRepository.save(newUser);

  const { password, role, ...otherData } = newUser;

  res.status(StatusCode.CREATED).json({
    message: "User registered successfully",
    newUser: otherData
  });
});

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userLoginDto = plainToInstance(UserLoginDto, req.body);

  const errors = await validate(userLoginDto);
  if (errors.length > 0) return next(new AppError(errors.map(err => Object.values(err.constraints || {})).join(", "), StatusCode.BAD_REQUEST));

  const user = await userRepository.findOne({
    where: { email: userLoginDto.email }
  });

  if (!user) return next(new AppError("Invalid credentials", StatusCode.BAD_REQUEST));

  const correctPassword = await comparePassword(userLoginDto.password, user.password);

  if (!correctPassword) return next(new AppError("Invalid credentials", StatusCode.BAD_REQUEST));

  const token = createToken(user.id, user.email);

  const { password, role, ...otherData } = user;

  res.json({
    message: "Login successfully",
    user: otherData,
    token
  });

});

export const getProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.user.id
  const user = await userRepository.findOne({
    where: { id: Number(id) }
  });

  if (!user) return next(new AppError("Account not found", StatusCode.NOT_FOUND));

  const { password, role, ...otherData } = user;

  res.json({ user: otherData });
});
