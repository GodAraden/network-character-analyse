import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MockNService } from './mock-n.service';

@Controller('api/user')
export class MockNController {
  constructor(private readonly mockNService: MockNService) {}

  @Get('info/:id')
  getUserInfo(@Param('id', ParseIntPipe) id: number) {
    return this.mockNService.getUserInfo(id);
  }

  @Get('post/:id')
  getUserPosts(@Param('id', ParseIntPipe) id: number) {
    return this.mockNService.getUserPosts(id);
  }

  @Get('relation/:id')
  getUserRelation(
    @Param('id', ParseIntPipe) id: number,
    @Query('type') type: 'followers' | 'followings',
  ) {
    return this.mockNService.getUserRelation(id, type);
  }
}
