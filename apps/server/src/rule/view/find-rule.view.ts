import { Prisma, Rule } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class FindRuleView implements Rule {
  id: string;
  name: string;
  base: string;
  depth: number;

  @Exclude()
  resolve: Prisma.JsonValue;

  @Exclude()
  parameter: Prisma.JsonValue;

  @Exclude()
  _count: { rules: number };

  @Expose()
  rules: number;

  constructor(partial: Partial<FindRuleView>) {
    this.rules = partial._count.rules;
    Object.assign(this, partial);
  }
}

export class FindRuleItemView {
  id: string;
  name: string;
  base: string;
  depth: number;
  rules: any;

  resolve: Prisma.JsonValue;

  parameter: Prisma.JsonValue;

  constructor(partial: Partial<FindRuleView>) {
    Object.assign(this, partial);
  }
}
