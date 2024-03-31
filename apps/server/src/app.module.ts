import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RuleModule } from './rule/rule.module';
import { QueryModule } from './query/query.module';

@Module({
  imports: [UserModule, RuleModule, QueryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
