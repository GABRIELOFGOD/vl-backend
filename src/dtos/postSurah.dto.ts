import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { SurahCategory } from "../entities/surah.entity";

export class PostSurahDto {
  @IsEnum(SurahCategory)
  @IsNotEmpty()
  category: SurahCategory;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}