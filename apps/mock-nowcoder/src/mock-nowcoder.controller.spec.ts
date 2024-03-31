import { Test, TestingModule } from '@nestjs/testing';
import { MockNowcoderController } from './mock-nowcoder.controller';
import { MockNowcoderService } from './mock-nowcoder.service';

describe('MockNowcoderController', () => {
  let mockNowcoderController: MockNowcoderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MockNowcoderController],
      providers: [MockNowcoderService],
    }).compile();

    mockNowcoderController = app.get<MockNowcoderController>(
      MockNowcoderController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mockNowcoderController.getHello()).toBe('Hello Nowcoder!');
    });
  });
});
