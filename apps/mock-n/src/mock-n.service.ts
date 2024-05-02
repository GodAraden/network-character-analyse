import { DBService } from '@app/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockNService {
  constructor(private readonly dbService: DBService) {}

  getUserInfo(userId: number) {
    return this.dbService.nUser.findUniqueOrThrow({ where: { userId } });
  }

  getUserPosts(userId: number) {
    return this.dbService.nPost.findMany({
      where: { postBy: { is: { userId } } },
    });
  }

  async getUserRelation(id: number, type: 'followers' | 'followings') {
    return (
      await this.dbService.nUser.findUnique({
        where: { userId: id },
        include: { [type]: true },
      })
    )[type];
  }
}
