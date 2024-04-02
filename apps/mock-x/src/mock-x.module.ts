import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { MockXController } from './mock-x.controller';
import { MockXService } from './mock-x.service';

@Module({
  imports: [AppConfigModule],
  controllers: [MockXController],
  providers: [MockXService],
})
export class MockXModule {}
