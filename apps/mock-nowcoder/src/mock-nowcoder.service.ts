import { Injectable } from '@nestjs/common';

@Injectable()
export class MockNowcoderService {
  getHello(): string {
    return 'Hello Nowcoder!';
  }
}
