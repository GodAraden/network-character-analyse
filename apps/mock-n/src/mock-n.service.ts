import { Injectable } from '@nestjs/common';

@Injectable()
export class MockNService {
  getHello(): string {
    return 'Hello World!';
  }
}
