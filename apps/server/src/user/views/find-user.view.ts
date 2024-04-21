import { User, $Enums } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class FindUserView implements User {
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

  constructor(partial: Partial<FindUserView>) {
    Object.assign(this, partial);
  }
}
