import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { gerarSlots } from '../utils/gerarslots';
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

    const slots = gerarSlots(hora_inicio, hora_fim, 30);
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

  async findAll(): Promise<Agenda[]> {
    return this.agendaRepository.find({
      relations: ['medico', 'medico.funcionario', 'medico.especialidade'],
      order: { data: 'ASC', hora_inicio: 'ASC' },
    });
  }

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
      'data' in dto || 'hora_inicio' in dto || 'hora_fim' in dto;

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

  async remove(id: number): Promise<void> {
    const agenda = await this.findOne(id);
    await this.agendaRepository.remove(agenda);
  }

  async findAgendaDisponiveis(
    id_medico:number,
    data?: string,
  ): Promise<Agenda[]> {
    const where: any = {
      medico: {id:id_medico},
      status: StatusAgenda.DISPONIVEL,
    };
    if (data) {
      where.data = data;
    }
    return this.agendaRepository.find({
      where,
      relations: ['medico'],
      order:{
      data: 'ASC',
      hora_inicio: 'ASC',
      },
    })
  }
 
async findAgendaIdByMedicoAndHora(
  id_medico: number,
  horaInicio: string,
  data?: string,
): Promise<{ id: number }> {
  const where: any = { medico: { id: id_medico }, hora_inicio: horaInicio,
    
  };

  if (data) where.data = data;

  const agenda = await this.agendaRepository.findOne({
    where,
    select: ['id'],
  });

  if (!agenda) {
    throw new NotFoundException(
      `Nenhum slot encontrado para o médico ${id_medico} na hora ${horaInicio}${
        data ? ` e data ${data}` : ''
      }`,
    );
  }

  return { id: agenda.id };
}
}
