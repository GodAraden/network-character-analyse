import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';

import {
  ResponseInterceptor,
  HttpExceptionFilter,
  LoggerMiddleware,
  PrismaExceptionFilter,
  ValidationPipe,
} from '@app/common';
import { AppConfigService } from '@app/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.use(LoggerMiddleware);

  app.use(
    session({
      secret: 'network_character_analysis',
      name: 'session',
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: { maxAge: null },
    }),
  );

  await app.listen(app.get(AppConfigService).ServerPort);
}
bootstrap();
