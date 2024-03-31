import { Controller, Get } from '@nestjs/common';
import { MockXiaohongshuService } from './mock-xiaohongshu.service';

@Controller()
export class MockXiaohongshuController {
  constructor(
    private readonly mockXiaohongshuService: MockXiaohongshuService,
  ) {}

  @Get()
  getHello(): string {
    return this.mockXiaohongshuService.getHello();
  }
}
