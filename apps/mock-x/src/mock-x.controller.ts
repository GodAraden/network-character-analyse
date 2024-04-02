import { Controller, Get } from '@nestjs/common';
import { MockXService } from './mock-x.service';

@Controller()
export class MockXController {
  constructor(private readonly mockXService: MockXService) {}

  @Get()
  getHello(): string {
    return this.mockXService.getHello();
  }
}
