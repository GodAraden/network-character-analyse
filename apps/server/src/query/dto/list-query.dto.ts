import { $Enums, Query } from '@prisma/client';
import { PaginationDto } from '../../utils/pagination.dto';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ListQueryDto extends PaginationDto implements Partial<Query> {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  ruleId?: string;

  @IsNumber()
  @IsOptional()
  operatorId?: number;

  @IsOptional()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsDateString({}, { each: true })
  createTimeRange?: [string, string];

  @IsEnum($Enums.QueryStatus)
  @IsOptional()
  status?: $Enums.QueryStatus;
}
