import { Module } from '@nestjs/common';
import { MockNowcoderController } from './mock-nowcoder.controller';
import { MockNowcoderService } from './mock-nowcoder.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MockNowcoderController],
  providers: [MockNowcoderService],
})
export class MockNowcoderModule {}
