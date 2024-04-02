import { Test, TestingModule } from '@nestjs/testing';
import { MockXController } from './mock-x.controller';
import { MockXService } from './mock-x.service';

describe('MockXController', () => {
  let mockXController: MockXController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MockXController],
      providers: [MockXService],
    }).compile();

    mockXController = app.get<MockXController>(MockXController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mockXController.getHello()).toBe('Hello World!');
    });
  });
});
