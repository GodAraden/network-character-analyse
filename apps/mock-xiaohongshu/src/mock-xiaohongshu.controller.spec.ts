import { Test, TestingModule } from '@nestjs/testing';
import { MockXiaohongshuController } from './mock-xiaohongshu.controller';
import { MockXiaohongshuService } from './mock-xiaohongshu.service';

describe('MockXiaohongshuController', () => {
  let mockXiaohongshuController: MockXiaohongshuController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MockXiaohongshuController],
      providers: [MockXiaohongshuService],
    }).compile();

    mockXiaohongshuController = app.get<MockXiaohongshuController>(
      MockXiaohongshuController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mockXiaohongshuController.getHello()).toBe('Hello Xiaohongshu!');
    });
  });
});
