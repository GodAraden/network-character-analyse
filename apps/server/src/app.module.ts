import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { DBModule } from '@app/db';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RuleModule } from './rule/rule.module';
import { QueryModule } from './query/query.module';

@Global()
@Module({
  imports: [UserModule, RuleModule, QueryModule, AppConfigModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [DBModule],
})
export class AppModule {}
