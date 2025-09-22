import { Role, User } from '@/entities';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterUseCaseDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role = Role.USER;
}

export class LoginUseCaseDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class CheckAuthUseCaseDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsOptional()
  @IsEnum(Role)
  roleToCheck?: Role = Role.USER;
}

// Define response data for register use case
export type RegisterUseCaseData = {
  user: User;
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

// Define response data for login use case
export type LoginUseCaseData = {
  user: User;
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

// Define response data for check auth use case
export type CheckAuthUseCaseData = User;
