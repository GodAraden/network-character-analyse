import { $Enums, User } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '../../utils/pagination.dto';

export class FindUserListDto
  extends PaginationDto
  implements Partial<Omit<User, 'password' | 'avatar'>>
{
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
