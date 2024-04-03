import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';

import { CreateUserItem } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserListDto, UserLoginDto } from './dto/find-user.dto';
import {
  pickPagination,
  fuzzySearch,
  rangeSearch,
  exactSearch,
} from '../utils';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DBService) {}

  create(users: CreateUserItem[]) {
    return this.dbService.user.createMany({
      data: users,
    });
  }

  async findList(params: FindUserListDto) {
    const { pagination, restParams } = pickPagination(params);
    const where = {
      ...fuzzySearch(restParams, ['nickname', 'username', 'email']),
      ...rangeSearch(restParams, [
        ['createTimeRange', 'createTime', ['gte', 'lte']],
      ]),
      ...exactSearch(restParams, ['id', 'role', 'status']),
    };

    const total = await this.dbService.user.count({ where });
    const data = await this.dbService.user.findMany({ where, ...pagination });
    return { data: data.map((plain) => new UserEntity(plain)), total };
  }

  async login(params: UserLoginDto) {
    const user = await this.dbService.user.findFirst({
      where: params,
      select: { id: true, role: true },
    });
    return user;
  }

  update(id: number, params: UpdateUserDto) {
    return this.dbService.user.update({
      where: { id },
      data: params,
      select: { id: true },
    });
  }
}
