import { Test, TestingModule } from '@nestjs/testing';
import { MockNController } from './mock-n.controller';
import { MockNService } from './mock-n.service';

describe('MockNController', () => {
  let mockNController: MockNController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MockNController],
      providers: [MockNService],
    }).compile();

    mockNController = app.get<MockNController>(MockNController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mockNController.getHello()).toBe('Hello World!');
    });
  });
});
