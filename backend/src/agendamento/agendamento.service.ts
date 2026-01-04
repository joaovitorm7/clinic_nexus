import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { AgendaService } from 'src/agenda/services/agenda.service';
import { StatusAgenda } from 'src/agenda/enums/status-agenda.enum';
import { Agenda } from 'src/agenda/entities/agenda.entity';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
    @InjectRepository(Agendamento)
    private readonly agendamentoRepository: Repository<Agendamento>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
    private readonly agendaService: AgendaService, 

  ) {}


async create(dto: CreateAgendamentoDto): Promise<Agendamento> {
  const agenda = await this.agendaRepository.findOne({
    where: { id: dto.id_agenda },
    relations: ['medico'],
  });

  if (!agenda) {
    throw new NotFoundException('Agenda não encontrada');
  }

  // Cria a consulta
  const agendamento = this.agendamentoRepository.create({
    data: dto.data,
    status: 'agendada',
    motivo_consulta: dto.motivo_consulta,
    paciente: { id: dto.id_paciente },
    medico: { id: dto.id_medico },
    agenda,
  });

  const consultaSalva = await this.agendamentoRepository.save(agendamento);

  // Atualiza agenda
  agenda.status = StatusAgenda.OCUPADO;
  agenda.consulta = consultaSalva;

  await this.agendaRepository.save(agenda);

  return this.agendamentoRepository.findOne({
    where: { id: consultaSalva.id },
    relations: ['paciente', 'medico', 'agenda'],
  });
}


  findById(id: number): Promise<Agendamento> {
    return this.agendamentoRepository.findOne({
      where: { id },
      relations: [
        'paciente',
        'medico',
        'medico.especialidade',
        'medico.funcionario',
      ],
    });
  }

  async update(id: number, dto: UpdateAgendamentoDto): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id },
      relations: ['paciente', 'medico', 'medico.especialidade'],
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    // Extrai id_paciente/id_medico para não sobrescrever as relações com Object.assign
    const { id_paciente, id_medico, ...rest } = dto as any;

    // Tratar paciente
    if (dto.hasOwnProperty('id_paciente')) {
      if (id_paciente === null) {
        agendamento.paciente = null;
      } else {
        const paciente = await this.pacienteRepository.findOne({
          where: { id: id_paciente },
        });
        if (!paciente) throw new NotFoundException('Paciente não encontrado');
        agendamento.paciente = paciente;
      }
    }

    // Tratar medico
    if (dto.hasOwnProperty('id_medico')) {
      if (id_medico === null) {
        agendamento.medico = null;
      } else {
        const medico = await this.medicoRepository.findOne({
          where: { id: id_medico },
        });
        if (!medico) throw new NotFoundException('Médico não encontrado');
        agendamento.medico = medico;
      }
    }

    // Atualiza os demais campos (data, motivo, status, etc.)
    Object.assign(agendamento, rest);

    return await this.agendamentoRepository.save(agendamento);
  }
  async updateStatus(id: number, status: string) {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id },
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    agendamento.status = status;

    return this.agendamentoRepository.save(agendamento);
  }

  async cancelAgendamento(id: number): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id },
      relations: ['paciente', 'medico'],
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    // Validar se já foi realizada
    if (agendamento.status === 'realizada') {
      throw new Error('Não é possível cancelar uma consulta já realizada');
    }

    // Validar se já está cancelada
    if (agendamento.status === 'cancelada') {
      throw new Error('Esta consulta já foi cancelada');
    }

    // Atualizar status para cancelada
    agendamento.status = 'cancelada';

    return await this.agendamentoRepository.save(agendamento);
  }

  async findAgendamentosByPacienteId(
    pacienteId: number,
  ): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      where: { paciente: { id: pacienteId } },
      relations: ['paciente'],
    });
  }

  async findAll(): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      relations: [
        'paciente',
        'medico',
        'medico.especialidade',
        'medico.funcionario',
      ],
    });
  }

  async findOne(id: number): Promise<Agendamento | null> {
    return this.agendamentoRepository.findOne({
      where: { id },
      relations: ['paciente', 'medico', 'medico.especialidade'],
    });
  }

  async findByDate(date: Date): Promise<Agendamento[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.agendamentoRepository.find({
      where: {
        data: Between(startOfDay, endOfDay),
      },
      relations: ['paciente', 'medico', 'medico.especialidade'],
    });
  }
  async remove(id: number): Promise<void> {
    await this.agendamentoRepository.delete(id);
  }
}
