import { NestFactory } from '@nestjs/core';
import {
  ResponseInterceptor,
  HttpExceptionFilter,
  LoggerMiddleware,
  PrismaExceptionFilter,
} from '@app/common';
import { PORTS } from '@app/config';
import { MockNowcoderModule } from './mock-nowcoder.module';

async function bootstrap() {
  const app = await NestFactory.create(MockNowcoderModule);
  const port = await PORTS('getMockNowcoderPort');

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());

  app.use(LoggerMiddleware);

  await app.listen(port);
}
bootstrap();
