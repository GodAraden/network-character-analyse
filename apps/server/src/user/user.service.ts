import { BadRequestException, Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { DBService } from '@app/db';

import { CreateUserItem } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserListDto, UserLoginDto } from './dto/find-user.dto';
import { FindUserView } from './views/find-user.view';
import { FindUserListDao } from './dao/find-user.dao';
import { format } from '../utils';
import { writeFile } from 'fs/promises';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DBService) {}

  create(users: CreateUserItem[]) {
    return this.dbService.user.createMany({
      data: users,
    });
  }

  findAll() {
    return this.dbService.user.findMany({
      select: {
        id: true,
        username: true,
        nickname: true,
      },
    });
  }

  async findList(params: FindUserListDto) {
    const { skip, take, ...where } = format(FindUserListDao, params);
    const count = await this.dbService.user.count({ where });
    const list = await this.dbService.user.findMany({ where, skip, take });
    return { list: list.map((user) => new FindUserView(user)), count };
  }

  async login(params: UserLoginDto) {
    const user = await this.dbService.user.findFirst({
      where: { username: params.username },
    });

    if (!user) throw new BadRequestException('UserNotFound');
    if (user.password !== params.password) {
      throw new BadRequestException('WrongPassword');
    }
    if (user.status === $Enums.UserStatus.disable) {
      throw new BadRequestException('UserDisabled');
    }

    return { id: user.id, role: user.role };
  }

  async getUserInfo(id: number) {
    const userInfo = await this.dbService.user.findUnique({
      where: { id },
    });
    return new FindUserView(userInfo);
  }

  update(id: number, params: UpdateUserDto) {
    return this.dbService.user.update({
      where: { id },
      data: params,
      select: { id: true },
    });
  }

  async uploadFile(id: number, file: Express.Multer.File) {
    const suffix = file.originalname.split('.').pop();
    const filePath = `images/${[id, 'avatar', suffix].join('.')}`;
    await writeFile(filePath, file.buffer);
    return filePath;
  }
}
