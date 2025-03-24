import { IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}