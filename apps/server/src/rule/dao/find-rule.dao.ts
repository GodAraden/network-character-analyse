import { Rule } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { FindRuleDto } from '../dto/find-rule.dto';
import { PaginationDao } from '../../utils/pagination.dao';

export class FindRuleDao extends PaginationDao implements Partial<Rule> {
  private _keyword?: string;

  id?: string;
  name?: string;
  base?: string;

  @Exclude()
  keyword?: string;

  @Expose()
  get OR() {
    return (
      this._keyword && [
        { id: { contains: this._keyword } },
        { name: { contains: this._keyword } },
        { base: { contains: this._keyword } },
      ]
    );
  }

  constructor(dto: Partial<FindRuleDto>) {
    super(dto);
    this._keyword = dto.keyword;
    Object.assign(this, dto);
  }
}
