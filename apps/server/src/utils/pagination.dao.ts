import { Exclude, Expose } from 'class-transformer';
import { PaginationDto } from './pagination.dto';

export class PaginationDao {
  private _current: number = 1;
  private _pageSize: number = 20;

  @Exclude()
  current?: number;

  @Exclude()
  pageSize?: number;

  @Expose()
  get skip(): number {
    return (this._current - 1) * this._pageSize;
  }

  @Expose()
  get take(): number {
    return this._pageSize;
  }

  constructor(partial: Partial<PaginationDto>) {
    const { current, pageSize } = partial || {};
    if (current) this._current = current;
    if (pageSize) this._pageSize = pageSize;
    Object.assign(this, partial);
  }
}
