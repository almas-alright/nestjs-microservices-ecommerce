import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsArray()
  roles?: string[]; // Optional
}
