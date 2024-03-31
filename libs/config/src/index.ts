import { NestFactory } from '@nestjs/core';
import { ConfigService } from './config.service';
import { ConfigModule } from './config.module';

export * from './config.service';
export * from './config.module';

export async function PORTS(method: keyof ConfigService) {
  const app = await NestFactory.createApplicationContext(ConfigModule);
  const configService = app.get(ConfigService);
  return configService[method]();
}
