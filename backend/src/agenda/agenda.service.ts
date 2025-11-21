import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda } from './entities/agenda.entity';
import { Medico } from 'src/medico/entities/medico.entity';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,

    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  // função de cadastro de agenda
  async create(createAgendaDto: CreateAgendaDto) {
    const { id_medico, data, hora_inicio, hora_fim } = createAgendaDto;

    //primeiro verifica se médico existe
    const medico = await this.medicoRepository.findOne({
      where: { id: id_medico },
      relations: ['funcionario'],
    });

    if (!medico) {
      throw new NotFoundException('Médico não encontrado');
    }

    // valida o CPF e status do médico
    if (!medico.funcionario || !medico.funcionario.cpf) {
      throw new BadRequestException('CPF do médico não cadastrado');
    }

    if (medico.funcionario.data_desativacao) {
      throw new BadRequestException('Médico está inativo e não pode receber agenda');
    }

    // valida o conflito de horário
    const conflito = await this.agendaRepository.findOne({
      where: {
        medico: { id: id_medico },
        data,
        hora_inicio,
        hora_fim,
      },
    });

    if (conflito) {
      throw new BadRequestException(
        'Já existe agenda cadastrada para este horário e data para este médico',
      );
    }

    // função pra criar agenda medica
    const agenda = this.agendaRepository.create({
      medico,
      data,
      hora_inicio,
      hora_fim,
      status: 'disponivel',
    });

    return await this.agendaRepository.save(agenda);
  }

  // aqui listaremos as agendas
  async findAll() {
    return await this.agendaRepository.find({
      relations: ['medico', 'medico.funcionario'],
    });
  }

  // busca por ID
  async findOne(id: number) {
    const agenda = await this.agendaRepository.findOne({
      where: { id },
      relations: ['medico', 'medico.funcionario'],
    });

    if (!agenda) throw new NotFoundException('Agenda não encontrada');

    return agenda;
  }

  // atualiza a agenda
  async update(id: number, updateAgendaDto: UpdateAgendaDto) {
    const agenda = await this.findOne(id);

    const updated = Object.assign(agenda, updateAgendaDto);
    return await this.agendaRepository.save(updated);
  }

  // deleta a agenda
  async remove(id: number) {
    const agenda = await this.findOne(id);
    return await this.agendaRepository.remove(agenda);
  }
}
