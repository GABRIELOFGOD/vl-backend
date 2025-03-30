import { NextFunction, Response } from "express";
import catchAsync from "../middleware/catchAsync.middleware";
import { Request } from "../types/user";
import { plainToInstance } from "class-transformer";
import { ApplicationDto } from "../dtos/application.dto";
import { validate } from "class-validator";
import { AppError } from "../utils/error.middleware";
import { StatusCode } from "../utils/statusCode";
import { applicationRepository } from "../utils/repositories";
import { getApplicationId, getUserAge } from "../services/helpers";
import getApplication from "../services/getApplication";
import { uploadPhoto } from "../services/fileUpload";
import { applicantionUpload } from "../services/applicationUploadChecker";
import { EmailService } from "../services/sendEmail";

const emailService = new EmailService();

export const postApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const applicationDto = plainToInstance(ApplicationDto, req.body);

  const errors = await validate(applicationDto);
  if (errors.length > 0) return next(new AppError(errors.map(err => Object.values(err.constraints || {})).join(", "), StatusCode.BAD_REQUEST));

  const userRegistered = await applicationRepository.findOne({
    where: { email: applicationDto.email }
  });

  if (userRegistered) return next(new AppError("Sorry you have applied before, kindly login to your account", StatusCode.CONFLICT));

  const userAge = getUserAge(applicationDto.dob);

  let applicationId = getApplicationId();
  while (await applicationRepository.findOne({ where: { applicationId } })) {
    applicationId = getApplicationId();
  }

  const newApplication = applicationRepository.create({
    ...applicationDto,
    age: userAge,
    applicationId
  });

  await applicationRepository.save(newApplication);

  res.json({
    message: "Application saved, please continue with your registration and upload required data",
    applicationId
  });
});

export const getApplicationWithApplicationId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const applicationId = req.params.applicationId;
  console.log("Heye");
  const application = await applicationRepository.findOne({
    where: { applicationId }
  });

  if (!application) return next(new AppError("Application not found", StatusCode.NOT_FOUND));

  res.json({ application });
});

export const uploadProfilePhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) return next(new AppError("Please upload a photo", StatusCode.BAD_REQUEST));
    const application = await getApplication(req.applicationId);
    if (application.passport !== null && application.passport !== "") return next(new AppError("Sorry you have uploaded a passport before, to change it, kindly reach out to an admin", StatusCode.BAD_REQUEST));

    const photo = await uploadPhoto(req.file);
    application.passport = photo;
    await applicationRepository.save(application);

    const isCompleted = applicantionUpload(application);
    if (isCompleted) await emailService.applicationMail(application);

    res.json({message: "Passport uploaded successfully"});
  } catch (error: any) {
    throw new AppError(error.message || "Something went wrong", error.statusCode || StatusCode.INTERNAL_SERVER_ERROR);
  }
});

export const uploadBirthCert = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) return next(new AppError("Please upload a photo", StatusCode.BAD_REQUEST));
    const application = await getApplication(req.applicationId);
    if (application.birthCert !== null && application.birthCert !== "") return next(new AppError("Sorry you have uploaded a birth certificate before, to change it, kindly reach out to an admin", StatusCode.BAD_REQUEST));

    const photo = await uploadPhoto(req.file);

    application.birthCert = photo;
    await applicationRepository.save(application);

    const isCompleted = applicantionUpload(application);
    if (isCompleted) await emailService.applicationMail(application);

    res.json({message: "Birth certificatex uploaded successfully"});
  } catch (error: any) {
    throw new AppError(error.message || "Something went wrong", error.statusCode || StatusCode.INTERNAL_SERVER_ERROR);
  }
});

export const uploadHarfiz = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) return next(new AppError("Please upload a photo", StatusCode.BAD_REQUEST));
    const application = await getApplication(req.applicationId);
    if (application.hafizCert !== null && application.hafizCert !== "") return next(new AppError("Sorry you have uploaded a Hafiz certificate before, to change it, kindly reach out to an admin", StatusCode.BAD_REQUEST));

    const photo = await uploadPhoto(req.file);
    application.hafizCert = photo;
    await applicationRepository.save(application);

    const isCompleted = applicantionUpload(application);
    if (isCompleted) await emailService.applicationMail(application);

    res.json({message: "Harfiz certificate uploaded successfully"});
  } catch (error: any) {
    throw new AppError(error.message || "Something went wrong", error.statusCode || StatusCode.INTERNAL_SERVER_ERROR);
  }
});

export const continueApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {})

export const completeApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
