import { Test, TestingModule } from '@nestjs/testing';
import { FuncionarioService } from './funcionarios.service';

describe('FuncionariosService', () => {
  let service: FuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncionarioService],
    }).compile();

    service = module.get<FuncionarioService>(FuncionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
