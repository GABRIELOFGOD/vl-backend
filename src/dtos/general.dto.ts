import { IsBoolean } from "class-validator";

export class UpdateGeneralSettingsDto {
  @IsBoolean()
  applicationOpen: boolean;

  @IsBoolean()
  allowVideoUpload: boolean;

  @IsBoolean()
  allowAdminRegistration: boolean;
}