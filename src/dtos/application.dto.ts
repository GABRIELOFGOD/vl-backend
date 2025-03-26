import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SurahCategory } from "../entities/surah.entity";

export class ApplicationDto {
  @IsString()
  @IsNotEmpty()
  fname: string;

  @IsString()
  @IsNotEmpty()
  lname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  dob: string;

  @IsEnum(SurahCategory)
  @IsNotEmpty()
  ageGroup: SurahCategory;
  
  @IsString()
  @IsNotEmpty()
  state: string;
  
  @IsString()
  @IsNotEmpty()
  lga: string;
  
  @IsString()
  @IsOptional()
  instagram: string;
  
  @IsString()
  @IsOptional()
  tiktok: string;
  
  @IsString()
  @IsNotEmpty()
  madrasah: string;
  
  @IsString()
  @IsNotEmpty()
  address: string;
}