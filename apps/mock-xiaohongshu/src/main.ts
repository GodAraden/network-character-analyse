import { NestFactory } from '@nestjs/core';
import {
  ResponseInterceptor,
  HttpExceptionFilter,
  LoggerMiddleware,
  PrismaExceptionFilter,
} from '@app/common';
import { PORTS } from '@app/config';
import { MockXiaohongshuModule } from './mock-xiaohongshu.module';

async function bootstrap() {
  const app = await NestFactory.create(MockXiaohongshuModule);
  const port = await PORTS('getMockXiaohongshuPort');

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());

  app.use(LoggerMiddleware);

  await app.listen(port);
}
bootstrap();
