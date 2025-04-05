import { NextFunction, Request, Response } from "express";
import catchAsync from "../middleware/catchAsync.middleware";
import { generalRepository } from "../utils/repositories";
import { UpdateGeneralSettingsDto } from "../dtos/general.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AppError } from "../utils/error.middleware";
import { StatusCode } from "../utils/statusCode";

export const getGeneralSettings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const allSettings = await generalRepository.find();
  const firstAndOnlySettings = allSettings[0]
  res.json({ allSettings: firstAndOnlySettings });
});

export const updateSetting = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const updateSettingDto = plainToInstance(UpdateGeneralSettingsDto, req.body);
  
    // Validate the DTO
    const errors = await validate(updateSettingDto);
    if (errors.length > 0) {
      return next(new AppError(errors.map(err => Object.values(err.constraints || {})).join(", "), StatusCode.BAD_REQUEST));
    }
  // const updateSettingDto: UpdateGeneralSettingsDto = req.body;
  await generalRepository.update(1, updateSettingDto);
  res.json({ message: "Settings Updated", settings: updateSettingDto });
});
