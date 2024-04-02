import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { MockNController } from './mock-n.controller';
import { MockNService } from './mock-n.service';

@Module({
  imports: [AppConfigModule],
  controllers: [MockNController],
  providers: [MockNService],
})
export class MockNModule {}
