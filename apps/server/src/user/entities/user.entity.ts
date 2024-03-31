import { User, Role, UserStatus } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  username: string;
  password: string;
  nickname: string;
  avatar: string;
  role: Role;
  email: string;
  createTime: Date;
  status: UserStatus;
}
