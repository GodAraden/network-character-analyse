import { Module } from '@nestjs/common';
import { DBModule } from '@app/db';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DBModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
