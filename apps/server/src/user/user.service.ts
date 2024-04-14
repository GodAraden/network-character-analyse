import { BadRequestException, Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { DBService } from '@app/db';

import { CreateUserItem } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserListDto, UserLoginDto } from './dto/find-user.dto';
import { UserEntity } from './entities/user.entity';
import { FindUserListEntity } from './entities/find-user.entity';
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

  async findList(params: FindUserListDto) {
    const { skip, take, ...where } = format(FindUserListEntity, params);
    const count = await this.dbService.user.count({ where });
    const list = await this.dbService.user.findMany({ where, skip, take });
    return { list, count };
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
    return new UserEntity(userInfo);
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
