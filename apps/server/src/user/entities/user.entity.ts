import { User, Role, UserStatus } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  role: Role;
  email: string;
  createTime: Date;
  status: UserStatus;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
