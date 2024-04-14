import { User, $Enums } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  role: $Enums.Role;
  email: string;
  createTime: Date;
  status: $Enums.UserStatus;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
