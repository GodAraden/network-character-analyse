import { User, UserStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

type UpdateUserInfoProperties = 'nickname' | 'password' | 'email' | 'avatar';
type UpdateUserStatusProperties = 'status';

export class UpdateUserInfoDto
  implements Partial<Pick<User, UpdateUserInfoProperties>>
{
  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

export class UpdateUserStatusDto
  implements Partial<Pick<User, UpdateUserStatusProperties>>
{
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}

export class UpdateUserDto
  implements
    Partial<Pick<User, UpdateUserInfoProperties | UpdateUserInfoProperties>>
{
  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}
