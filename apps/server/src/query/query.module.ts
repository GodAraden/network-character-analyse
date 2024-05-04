import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { RuleModule } from '../rule/rule.module';

@Module({
  imports: [RuleModule],
  controllers: [QueryController],
  providers: [QueryService],
})
export class QueryModule {}
