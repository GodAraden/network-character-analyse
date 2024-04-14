import { $Enums, User } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Mixin, Pagination } from '../../types';

type FindUserListParams = Mixin<
  Pagination & Partial<Omit<User, 'password' | 'avatar'>>
>;

export class FindUserListDto implements FindUserListParams {
  @IsOptional()
  @IsNumber()
  @Min(1)
  current?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize?: number;

  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsEnum($Enums.Role)
  role?: $Enums.Role;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsDateString({}, { each: true })
  createTimeRange?: [string, string];

  @IsOptional()
  @IsEnum($Enums.UserStatus)
  status?: $Enums.UserStatus;
}

type UserLoginParams = Partial<Pick<User, 'username' | 'password'>>;

export class UserLoginDto implements UserLoginParams {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
