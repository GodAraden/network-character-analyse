import { Controller, Get } from '@nestjs/common';
import { MockNService } from './mock-n.service';

@Controller()
export class MockNController {
  constructor(private readonly mockNService: MockNService) {}

  @Get()
  getHello(): string {
    return this.mockNService.getHello();
  }
}
