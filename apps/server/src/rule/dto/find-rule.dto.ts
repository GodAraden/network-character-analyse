import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../utils/pagination.dto';

export class FindRuleDto extends PaginationDto {
  @IsString()
  @IsOptional()
  keyword?: string;
}
