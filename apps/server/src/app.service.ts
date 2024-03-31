import { Injectable } from '@nestjs/common';
import { getAppInfo } from './dictionary';

@Injectable()
export class AppService {
  getHello() {
    return getAppInfo();
  }
}
