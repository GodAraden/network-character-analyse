import { Exclude, Expose, Transform } from 'class-transformer';
import { $Enums } from '@prisma/client';
import { FindUserListDto } from '../dto/find-user.dto';
import { PaginationDao } from '../../utils/pagination.dao';

export class FindUserListDao extends PaginationDao {
  id?: number;
  role?: $Enums.Role;
  status?: $Enums.UserStatus;

  @Transform(({ value }) => value && { contains: value })
  nickname?: string;

  @Transform(({ value }) => value && { contains: value })
  username?: string;

  @Transform(({ value }) => value && { contains: value })
  email?: string;

  @Exclude()
  createTimeRange?: [string, string];

  @Expose()
  get createTime() {
    return (
      this.createTimeRange && {
        gte: this.createTimeRange[0],
        lte: this.createTimeRange[1],
      }
    );
  }

  constructor(partial: Partial<FindUserListDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
