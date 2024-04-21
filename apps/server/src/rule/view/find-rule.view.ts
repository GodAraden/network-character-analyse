import { Rule } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class FindRuleView implements Rule {
  id: string;
  name: string;
  base: string;
  depth: number;

  @Exclude()
  _count: { rules: number };

  @Expose()
  rules: number;

  constructor(partial: Partial<FindRuleView>) {
    this.rules = partial._count.rules;
    Object.assign(this, partial);
  }
}
