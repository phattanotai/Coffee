import { Test, TestingModule } from '@nestjs/testing';
import { SweetnessController } from './sweetness.controller';

describe('SweetnessController', () => {
  let controller: SweetnessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SweetnessController],
    }).compile();

    controller = module.get<SweetnessController>(SweetnessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
