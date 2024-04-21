import { Prisma, Rule, RuleItem } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateRuleDto implements Partial<Rule> {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  base?: string;

  @IsNumber()
  @IsOptional()
  depth?: number;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => UpdateRuleItemDto)
  rules?: UpdateRuleItemDto[];
}

export class UpdateRuleItemDto implements Partial<RuleItem> {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  method?: string;

  @IsString()
  @IsOptional()
  path?: string;

  @IsJSON()
  @IsOptional()
  resolve?: Prisma.JsonValue;

  @IsJSON()
  @IsOptional()
  parameter?: Prisma.JsonValue;

  @IsNumber()
  @IsOptional()
  order?: number;
}
