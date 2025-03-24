import { IsBoolean, IsOptional } from "class-validator";

export class UpdateGeneralSettingsDto {
  @IsOptional()
  @IsBoolean()
  applicationOpen: boolean;

  @IsOptional()
  @IsBoolean()
  allowVideoUpload: boolean;

  @IsOptional()
  @IsBoolean()
  allowAdminRegistration: boolean;
}