import { Injectable } from '@nestjs/common';

@Injectable()
export class MockXService {
  getHello(): string {
    return 'Hello World!';
  }
}
