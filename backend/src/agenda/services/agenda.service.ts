import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Agenda } from '../entities/agenda.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { CreateAgendaDto } from '../dto/create-agenda.dto';
import { UpdateAgendaDto } from '../dto/update-agenda-consulta.dto';
import { StatusAgenda } from '../enums/status-agenda.enum';
import { UpdateAgendaDataDto } from '../dto/updateAgendaData.dto';
@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,

    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}


  private gerarSlots(
    horaInicio: string,
    horaFim: string,
    duracaoMinutos: number,
  ): { inicio: string; fim: string }[] {
    const slots = [];
    let atual = new Date(`2004-02-03T${horaInicio}:00`);
    const limites = new Date(`2004-02-03T${horaFim}:00`);

    while (atual < limites) {
      const proximo = new Date(atual.getTime() + duracaoMinutos * 60000);
      if (proximo > limites) break;

      slots.push({
        inicio: atual.toTimeString().slice(0, 5),
        fim: proximo.toTimeString().slice(0, 5),
      });

      atual = proximo;
    }
    return slots;
  }


  async create(dto: CreateAgendaDto): Promise<Agenda[]> {
    const { id_medico, data, hora_inicio, hora_fim } = dto;

    const medico = await this.medicoRepository.findOne({
      where: { id: id_medico },
      relations: ['funcionario'],
    });

    if (!medico) {
      throw new NotFoundException('Médico não encontrado');
    }

    if (medico.funcionario.data_desativacao) {
      throw new BadRequestException('Médico inativo não pode receber agenda');
    }

    const slots = this.gerarSlots(hora_inicio, hora_fim, 30);

    const agendasCriadas: Agenda[] = [];

    for (const slot of slots) {
      const agenda = await this.agendaRepository.save({
        medico,
        data,
        hora_inicio: slot.inicio,
        hora_fim: slot.fim,
        status: StatusAgenda.DISPONIVEL,
      });

      agendasCriadas.push(agenda);
    }

    return agendasCriadas;
  }

  // =====================================================
  // LISTAR TODAS AS AGENDAS
  // =====================================================
  async findAll(): Promise<Agenda[]> {
    return this.agendaRepository.find({
      relations: ['medico', 'medico.funcionario'],
      order: { data: 'ASC', hora_inicio: 'ASC' },
    });
  }

  // =====================================================
  // BUSCAR AGENDA POR ID
  // =====================================================
  async findOne(id: number): Promise<Agenda> {
    const agenda = await this.agendaRepository.findOne({
      where: { id },
      relations: ['medico', 'medico.funcionario'],
    });

    if (!agenda) {
      throw new NotFoundException('Agenda não encontrada');
    }

    return agenda;
  }


  async findByMedico(
    id_medico: number,
    status?: StatusAgenda,
    data?: string,
  ): Promise<Agenda[]> {
    const where: any = { medico: { id: id_medico } };

    if (status) where.status = status;
    if (data) where.data = data;

    return this.agendaRepository.find({
      where,
      relations: ['medico', 'medico.funcionario'],
      order: { data: 'ASC', hora_inicio: 'ASC' },
    });
  }


async update(
  id: number,
  dto: UpdateAgendaDto | UpdateAgendaDataDto,
): Promise<Agenda> {
  const agenda = await this.findOne(id);

  const alterandoHorario =
    'data' in dto ||
    'hora_inicio' in dto ||
    'hora_fim' in dto;

  if (alterandoHorario && agenda.status !== StatusAgenda.DISPONIVEL) {
    throw new BadRequestException(
      'Não é possível alterar data ou horário de um slot ocupado',
    );
  }

  if (alterandoHorario) {
    const conflito = await this.agendaRepository.findOne({
      where: {
        medico: { id: agenda.medico.id },
        data: dto.data ?? agenda.data,
        hora_inicio: dto.hora_inicio ?? agenda.hora_inicio,
      },
    });

    if (conflito && conflito.id !== agenda.id) {
      throw new BadRequestException(
        'Já existe um horário nesse dia e horário',
      );
    }
  }

if ('id_consulta' in dto && dto.id_consulta) {
  agenda.status = StatusAgenda.OCUPADO;
  agenda.consulta = { id: dto.id_consulta } as any;
}


  Object.assign(agenda, dto);
  return this.agendaRepository.save(agenda);
}




  // =====================================================
  // REMOVER AGENDA
  // =====================================================
  async remove(id: number): Promise<void> {
    const agenda = await this.findOne(id);
    await this.agendaRepository.remove(agenda);
  }
}

