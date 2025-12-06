import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { Agendamento } from './entities/agendamento.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Medico } from '../medico/entities/medico.entity';
import { Funcionario } from '../funcionarios/entities/funcionario.entity';

describe('AgendamentoService - Cancelar Consulta', () => {
  let service: AgendamentoService;
  let agendamentoRepository: Repository<Agendamento>;

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
      providers: [
        AgendamentoService,
        {
          provide: getRepositoryToken(Agendamento),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Paciente),
          useValue: { findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(Medico),
          useValue: { findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(Funcionario),
          useValue: { findOne: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AgendamentoService>(AgendamentoService);
    agendamentoRepository = module.get<Repository<Agendamento>>(
      getRepositoryToken(Agendamento),
    );
  });

  describe('cancelAgendamento', () => {
    it('deve cancelar uma consulta agendada com sucesso', async () => {
      const agendamentoParaCancelar = { ...mockAgendamento };

      jest
        .spyOn(agendamentoRepository, 'findOne')
        .mockResolvedValue(agendamentoParaCancelar);

      jest
        .spyOn(agendamentoRepository, 'save')
        .mockResolvedValue({ ...agendamentoParaCancelar, status: 'cancelada' });

      const resultado = await service.cancelAgendamento(1);

      expect(resultado.status).toBe('cancelada');
      expect(agendamentoRepository.findOne as jest.Mock).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['paciente', 'medico'],
      });
      expect(agendamentoRepository.save as jest.Mock).toHaveBeenCalled();
    });

    it('deve lançar NotFoundException quando agendamento não existe', async () => {
      jest.spyOn(agendamentoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.cancelAgendamento(999)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar erro ao tentar cancelar consulta já realizada', async () => {
      const agendamentoRealizado = {
        ...mockAgendamento,
        status: 'realizada',
      };

      jest
        .spyOn(agendamentoRepository, 'findOne')
        .mockResolvedValue(agendamentoRealizado);

      await expect(service.cancelAgendamento(1)).rejects.toThrow(
        'Não é possível cancelar uma consulta já realizada',
      );
    });

    it('deve lançar erro ao tentar cancelar consulta já cancelada', async () => {
      const agendamentoCancelada = {
        ...mockAgendamento,
        status: 'cancelada',
      };

      jest
        .spyOn(agendamentoRepository, 'findOne')
        .mockResolvedValue(agendamentoCancelada);

      await expect(service.cancelAgendamento(1)).rejects.toThrow(
        'Esta consulta já foi cancelada',
      );
    });

    it('deve atualizar status de pendente para cancelada', async () => {
      const agendamentoPendente = {
        ...mockAgendamento,
        status: 'pendente',
      };

      jest
        .spyOn(agendamentoRepository, 'findOne')
        .mockResolvedValue(agendamentoPendente);

      jest
        .spyOn(agendamentoRepository, 'save')
        .mockResolvedValue({ ...agendamentoPendente, status: 'cancelada' });

      const resultado = await service.cancelAgendamento(1);

      expect(resultado.status).toBe('cancelada');
    });
  });
});
