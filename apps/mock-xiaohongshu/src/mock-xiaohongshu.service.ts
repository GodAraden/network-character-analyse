import { Injectable } from '@nestjs/common';

@Injectable()
export class MockXiaohongshuService {
  getHello(): string {
    return 'Hello Xiaohongshu!';
  }
}
