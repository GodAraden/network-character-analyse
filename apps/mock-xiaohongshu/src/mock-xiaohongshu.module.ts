import { Module } from '@nestjs/common';
import { MockXiaohongshuController } from './mock-xiaohongshu.controller';
import { MockXiaohongshuService } from './mock-xiaohongshu.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MockXiaohongshuController],
  providers: [MockXiaohongshuService],
})
export class MockXiaohongshuModule {}
