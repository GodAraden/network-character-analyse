import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Network Character Analyse',
      version: '0.1.0',
      author: 'GodAraden',
      frontend: 'http://nca-fe.araden.top/',
      documentation: 'http://nca-doc.araden.top/',
      requestAt: new Date().toLocaleString('zh-CN'),
    };
  }
}
