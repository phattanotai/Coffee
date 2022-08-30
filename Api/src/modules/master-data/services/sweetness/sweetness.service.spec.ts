import { Test, TestingModule } from '@nestjs/testing';
import { SweetnessService } from './sweetness.service';

describe('SweetnessService', () => {
  let service: SweetnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SweetnessService],
    }).compile();

    service = module.get<SweetnessService>(SweetnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
