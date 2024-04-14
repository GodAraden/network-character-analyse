import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { access, mkdir } from 'fs/promises';

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
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.use(LoggerMiddleware);

  app.setGlobalPrefix('/api');

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

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

  try {
    await access('images');
  } catch (error) {
    await mkdir('images');
  }

  app.useStaticAssets('images', { prefix: '/images' });

  await app.listen(app.get(AppConfigService).ServerPort);
}
bootstrap();
