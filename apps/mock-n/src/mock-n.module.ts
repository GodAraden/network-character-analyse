import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { DBModule } from '@app/db';

import { MockNController } from './mock-n.controller';
import { MockNService } from './mock-n.service';

@Module({
  imports: [AppConfigModule, DBModule],
  controllers: [MockNController],
  providers: [MockNService],
})
export class MockNModule {}
