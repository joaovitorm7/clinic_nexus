import { Test, TestingModule } from '@nestjs/testing';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';
import { Paciente } from './entities/paciente.entity';

describe('PacienteController - Editar Dados', () => {
  let controller: PacienteController;
  let service: PacienteService;

  const mockPaciente: Paciente = {
    id: 1,
    nome: 'João Silva',
    cpf: '123.456.789-00',
    data_nascimento: new Date('1990-01-01'),
    contato: '11999999999',
    endereco: 'Rua A, 123',
    agendamentos: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacienteController],
      providers: [
        {
          provide: PacienteService,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PacienteController>(PacienteController);
    service = module.get<PacienteService>(PacienteService);
  });

  describe('update', () => {
    it('deve atualizar paciente e retornar dados alterados', async () => {
      const updateDto = {
        nome: 'João Santos',
        contato: '11988888888',
      };

      const pacienteAtualizado = { ...mockPaciente, ...updateDto };
      const updateMock = service.update as jest.Mock;

      updateMock.mockResolvedValue(pacienteAtualizado);

      const resultado = await controller.update(1, updateDto);

      expect(resultado).toEqual(pacienteAtualizado);
      expect(resultado.nome).toBe('João Santos');
      expect(updateMock).toHaveBeenCalledWith(1, updateDto);
    });

    it('deve lançar erro se paciente não existe', () => {
      const updateDto = { nome: 'Novo Nome' };
      const updateMock = service.update as jest.Mock;

      updateMock.mockRejectedValue(new Error('Paciente não encontrado'));

      return expect(controller.update(999, updateDto)).rejects.toThrow(
        'Paciente não encontrado',
      );
    });

    it('deve permitir atualização parcial de campos', async () => {
      const updateDto = { endereco: 'Rua Nova, 456' };

      const pacienteAtualizado = { ...mockPaciente, endereco: 'Rua Nova, 456' };
      const updateMock = service.update as jest.Mock;

      updateMock.mockResolvedValue(pacienteAtualizado);

      const resultado = await controller.update(1, updateDto);

      expect(resultado.endereco).toBe('Rua Nova, 456');
      expect(resultado.nome).toBe(mockPaciente.nome);
    });
  });
});
