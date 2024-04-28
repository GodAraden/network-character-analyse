import { $Enums, Query } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';
import { FindUserListDto } from '../../user/dto/find-user.dto';
import { PaginationDao } from '../../utils/pagination.dao';

export class ListQueryDao extends PaginationDao implements Partial<Query> {
  ruleId?: string;
  operatorId?: number;
  status?: $Enums.QueryStatus;

  @Transform(({ value }) => value && { contains: value })
  id?: string;

  @Transform(({ value }) => value && { contains: value })
  name?: string;

  @Exclude()
  createTimeRange?: [string, string];

  @Expose()
  get createAt(): any {
    return (
      this.createTimeRange && {
        gte: new Date(this.createTimeRange[0]),
        lte: new Date(this.createTimeRange[1]),
      }
    );
  }

  constructor(partial: Partial<FindUserListDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
