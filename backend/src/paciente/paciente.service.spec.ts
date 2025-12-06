import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Paciente } from './entities/paciente.entity';

describe('PacienteService - Editar Dados', () => {
  let service: PacienteService;
  let pacienteRepository: Repository<Paciente>;

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
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    pacienteRepository = module.get<Repository<Paciente>>(
      getRepositoryToken(Paciente),
    );
  });

  describe('update', () => {
    it('deve atualizar dados do paciente com sucesso', async () => {
      const updateDto = {
        nome: 'João Santos',
        contato: '11988888888',
        endereco: 'Rua B, 456',
      };

      const pacienteAtualizado = { ...mockPaciente, ...updateDto };

      (pacienteRepository.findOne as jest.Mock).mockResolvedValue(mockPaciente);
      (pacienteRepository.save as jest.Mock).mockResolvedValue(
        pacienteAtualizado,
      );

      const resultado = await service.update(1, updateDto);

      expect(resultado.nome).toBe('João Santos');
      expect(resultado.contato).toBe('11988888888');
      expect(resultado.endereco).toBe('Rua B, 456');
      expect(pacienteRepository.save as jest.Mock).toHaveBeenCalled();
    });

    it('deve lançar NotFoundException quando paciente não existe', async () => {
      (pacienteRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.update(999, { nome: 'Novo Nome' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve preservar campos não alterados', async () => {
      const updateDto = { nome: 'Novo Nome' };

      const pacienteAtualizado = { ...mockPaciente, nome: 'Novo Nome' };

      (pacienteRepository.findOne as jest.Mock).mockResolvedValue(mockPaciente);
      (pacienteRepository.save as jest.Mock).mockResolvedValue(
        pacienteAtualizado,
      );

      const resultado = await service.update(1, updateDto);

      expect(resultado.cpf).toBe(mockPaciente.cpf);
      expect(resultado.contato).toBe(mockPaciente.contato);
      expect(resultado.nome).toBe('Novo Nome');
    });

    it('deve validar que os dados foram salvos no banco', async () => {
      const updateDto = {
        nome: 'Maria Silva',
        contato: '21999999999',
      };

      const pacienteAtualizado = { ...mockPaciente, ...updateDto };

      (pacienteRepository.findOne as jest.Mock).mockResolvedValue(mockPaciente);
      (pacienteRepository.save as jest.Mock).mockResolvedValue(
        pacienteAtualizado,
      );

      await service.update(1, updateDto);

      expect(pacienteRepository.save as jest.Mock).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: 'Maria Silva',
          contato: '21999999999',
        }),
      );
    });

    it('deve atualizar apenas o endereco sem afetar outros campos', async () => {
      const updateDto = { endereco: 'Rua Nova, 999' };

      const pacienteAtualizado = {
        ...mockPaciente,
        endereco: 'Rua Nova, 999',
      };

      (pacienteRepository.findOne as jest.Mock).mockResolvedValue(mockPaciente);
      (pacienteRepository.save as jest.Mock).mockResolvedValue(
        pacienteAtualizado,
      );

      const resultado = await service.update(1, updateDto);

      expect(resultado.endereco).toBe('Rua Nova, 999');
      expect(resultado.nome).toBe(mockPaciente.nome);
      expect(resultado.cpf).toBe(mockPaciente.cpf);
    });
  });
});
