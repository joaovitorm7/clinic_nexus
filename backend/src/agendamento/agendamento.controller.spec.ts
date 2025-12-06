import { Test, TestingModule } from '@nestjs/testing';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoService } from './agendamento.service';
import { Agendamento } from './entities/agendamento.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Medico } from '../medico/entities/medico.entity';

describe('AgendamentoController - Cancelar Consulta', () => {
  let controller: AgendamentoController;
  let service: AgendamentoService;

  const mockAgendamento: Agendamento = {
    id: 1,
    status: 'agendada',
    data: new Date('2025-12-20'),
    motivo_consulta: 'Consulta de rotina',
    paciente: { id: 1 } as Paciente,
    medico: { id: 1 } as Medico,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamentoController],
      providers: [
        {
          provide: AgendamentoService,
          useValue: {
            cancelAgendamento: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AgendamentoController>(AgendamentoController);
    service = module.get<AgendamentoService>(AgendamentoService);
  });

  describe('cancelar', () => {
    it('deve retornar consulta cancelada com status 200', async () => {
      const canceledAgendamento = { ...mockAgendamento, status: 'cancelada' };
      const cancelAgendamentoMock = service.cancelAgendamento as jest.Mock;

      cancelAgendamentoMock.mockResolvedValue(canceledAgendamento);

      const resultado = await controller.cancelar(1);

      expect(resultado).toEqual(canceledAgendamento);
      expect(resultado.status).toBe('cancelada');
      expect(cancelAgendamentoMock).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro se agendamento não existe', () => {
      const cancelAgendamentoMock = service.cancelAgendamento as jest.Mock;

      cancelAgendamentoMock.mockRejectedValue(
        new Error('Agendamento não encontrado'),
      );

      return expect(controller.cancelar(999)).rejects.toThrow(
        'Agendamento não encontrado',
      );
    });
  });
});
