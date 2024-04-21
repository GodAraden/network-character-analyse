import { Prisma, Rule, RuleItem } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsJSON,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateRuleItemDto implements Partial<RuleItem> {
  @IsString()
  name: string;

  @IsString()
  method: string;

  @IsString()
  path: string;

  @IsJSON()
  resolve: Prisma.JsonValue;

  @IsJSON()
  parameter: Prisma.JsonValue;

  @IsNumber()
  order: number;
}

export class CreateRuleDto implements Partial<Rule> {
  @IsString()
  name: string;

  @IsString()
  base: string;

  @IsNumber()
  depth: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateRuleItemDto)
  rules: CreateRuleItemDto[];
}
