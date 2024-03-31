import { Controller, Get } from '@nestjs/common';
import { MockNowcoderService } from './mock-nowcoder.service';

@Controller()
export class MockNowcoderController {
  constructor(private readonly mockNowcoderService: MockNowcoderService) {}

  @Get()
  getHello(): string {
    return this.mockNowcoderService.getHello();
  }
}
