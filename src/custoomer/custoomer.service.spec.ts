import { Test, TestingModule } from '@nestjs/testing';
import { CustoomerService } from './custoomer.service';

describe('CustoomerService', () => {
  let service: CustoomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustoomerService],
    }).compile();

    service = module.get<CustoomerService>(CustoomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
