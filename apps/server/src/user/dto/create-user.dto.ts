import { User, Role, UserStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateUserItem implements Partial<User> {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsDate()
  @IsOptional()
  createTime?: Date;

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}

export class CreateUserDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserItem)
  users: CreateUserItem[];
}
