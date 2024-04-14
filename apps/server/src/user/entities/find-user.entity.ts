import { Exclude, Expose, Transform } from 'class-transformer';
import { FindUserListDto } from '../dto/find-user.dto';
import { $Enums } from '@prisma/client';

export class FindUserListEntity implements FindUserListDto {
  private _current: number = 1;
  private _pageSize: number = 20;

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
  current?: number;

  @Exclude()
  pageSize?: number;

  @Exclude()
  createTimeRange?: [string, string];

  @Expose()
  get skip(): number {
    return (this._current - 1) * this._pageSize;
  }

  @Expose()
  get take(): number {
    return this._pageSize;
  }

  @Expose()
  get createTime() {
    return (
      this.createTimeRange && {
        gte: this.createTimeRange[0],
        lte: this.createTimeRange[1],
      }
    );
  }

  constructor(partial: Partial<FindUserListEntity>) {
    const { current, pageSize } = partial || {};
    if (current) this._current = current;
    if (pageSize) this._pageSize = pageSize;

    Object.entries(partial).forEach(([key, value]) => {
      if (value === '') {
        partial[key] = void 0;
      }
    });

    Object.assign(this, partial);
  }
}
