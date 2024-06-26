import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  getHello() {
    return this.appService.getHello();
  }
}
