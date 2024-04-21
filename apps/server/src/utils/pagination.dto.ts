import { IsOptional, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  current?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize?: number;
}
