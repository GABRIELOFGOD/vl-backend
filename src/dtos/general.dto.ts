import { IsBoolean, IsDate, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";

export class UpdateGeneralSettingsDto {
  @IsNotEmpty()
  @IsBoolean()
  applicationOpen: boolean;

  @IsNotEmpty()
  @IsBoolean()
  allowVideoUpload: boolean;

  @IsNotEmpty()
  @IsBoolean()
  allowAdminRegistration: boolean;

  @ValidateIf((o) => o.applicationOpen !== null)
  @IsDate()
  @IsOptional()
  applicationStartDate: string | null;
  
}