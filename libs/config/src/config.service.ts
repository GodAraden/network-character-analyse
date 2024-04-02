import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  public ServerPort: number;
  public MockNCPort: number;
  public MockXHSPort: number;

  constructor(private configService: ConfigService) {
    this.ServerPort = this.getPort('SERVER_PORT', 23666);
    this.MockNCPort = this.getPort('MOCK_NC_PORT', 23888);
    this.MockXHSPort = this.getPort('MOCK_XHS_PORT', 23999);
  }

  private getPort(key: string, defaultValue = 3000): number {
    const port = this.configService.get<string>(key, defaultValue.toString());
    return parseInt(port, 10);
  }
}
