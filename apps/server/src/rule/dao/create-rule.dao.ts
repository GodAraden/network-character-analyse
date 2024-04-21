import { Transform } from 'class-transformer';
import { CreateRuleDto, CreateRuleItemDto } from '../dto/create-rule.dto';
import { RuleItem, Prisma } from '@prisma/client';
import { IsString, IsJSON, IsNumber } from 'class-validator';

export class CreateRuleItemDao implements Partial<RuleItem> {
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

  constructor(dto: Partial<CreateRuleItemDto>) {
    Object.assign(this, dto);
  }
}

export class CreateRuleDao {
  name: string;
  base: string;
  depth: number;

  @Transform(({ value }) => ({ create: value }))
  rules: { create: CreateRuleItemDto[] };

  constructor(dto: Partial<CreateRuleDto>) {
    Object.assign(this, dto);
  }
}
