import { NestFactory } from '@nestjs/core';
import { AppConfigService } from '@app/config';
import { MockNModule } from './mock-n.module';

async function bootstrap() {
  const app = await NestFactory.create(MockNModule);
  await app.listen(app.get(AppConfigService).MockNCPort);
}
bootstrap();
