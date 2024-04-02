import { NestFactory } from '@nestjs/core';
import { AppConfigService } from '@app/config';
import { MockXModule } from './mock-x.module';

async function bootstrap() {
  const app = await NestFactory.create(MockXModule);
  await app.listen(app.get(AppConfigService).MockXHSPort);
}
bootstrap();
