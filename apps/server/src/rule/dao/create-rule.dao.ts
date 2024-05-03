import { Transform } from 'class-transformer';
import { CreateRuleDto, CreateRuleItemDto } from '../dto/create-rule.dto';
import { RuleItem, Prisma } from '@prisma/client';

export class CreateRuleItemDao implements Partial<RuleItem> {
  name: string;
  method: string;
  path: string;
  order: number;

  @Transform(({ value }) => JSON.parse(value))
  resolve: Prisma.JsonValue;

  @Transform(({ value }) => JSON.parse(value))
  parameter: Prisma.JsonValue;

  constructor(dto: Partial<CreateRuleItemDto>) {
    Object.assign(this, dto);
  }
}

export class CreateRuleDao {
  name: string;
  base: string;
  depth: number;

  @Transform(({ value }) => JSON.parse(value))
  resolve: Prisma.JsonValue;

  @Transform(({ value }) => JSON.parse(value))
  parameter: Prisma.JsonValue;

  @Transform(({ value }) => ({ create: value }))
  rules: { create: CreateRuleItemDto[] };

  constructor(dto: Partial<CreateRuleDto>) {
    Object.assign(this, dto);
  }
}
