import { NextFunction, Response } from "express";
import { Request } from "../types/user";
import catchAsync from "../middleware/catchAsync.middleware";
import { plainToInstance } from "class-transformer";
import { PostSurahDto } from "../dtos/postSurah.dto";
import { validate } from "class-validator";
import { AppError } from "../utils/error.middleware";
import { StatusCode } from "../utils/statusCode";
import { SurahRepository } from "../utils/repositories";
import { getUser } from "../services/getUser";

export const postSurah = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const postSurahDto = plainToInstance(PostSurahDto, req.body);

  const errors = await validate(postSurahDto);
  if (errors.length > 0) return next(new AppError(errors.map(err => Object.values(err.constraints || {})).join(", "), StatusCode.BAD_REQUEST));

  const userId = req.user;
  
  const user = await getUser(userId.email);

  const surahExists = await SurahRepository.findOne({
    where: { title: postSurahDto.title }
  });

  if (surahExists) return next(new AppError("This surah has been posted already", StatusCode.CONFLICT));

  const newSurah = SurahRepository.create({
    ...postSurahDto, user
  });

  await SurahRepository.save(newSurah);

  res.json({
    message: "Surah created successfully",
    newSurah
  });
});

export const getAllSurah = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const surahs = await SurahRepository.find({
    relations: ["user"]
  });
  res.json({surahs});
});
