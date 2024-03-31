import { Role } from '@prisma/client';

export type Pagination = {
  current?: number;
  pageSize?: number;
};

export type Mixin<T> = {
  [key in keyof T]: T[key];
};

export interface CustomSession {
  user: {
    id: number;
    role: Role;
  };
}
