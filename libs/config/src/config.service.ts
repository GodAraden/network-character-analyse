import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  private getPort(key: string, defaultValue = 3000): number {
    try {
      const port = this.configService.getOrThrow<string>(key);
      return parseInt(port, 10);
    } catch (error) {
      console.log(
        `[libs/config] 引入环境变量 ${key} 出错，已返回兜底值：${defaultValue}\n\t${error.message}\n`,
      );
    }
    return defaultValue;
  }

  getServerPort() {
    return this.getPort('SERVER_PORT', 23666);
  }

  getMockNowcoderPort() {
    return this.getPort('MOCK_NOWCODER_PORT', 23888);
  }

  getMockXiaohongshuPort() {
    return this.getPort('MOCK_XIAOHONGSHU_PORT', 23999);
  }
}
