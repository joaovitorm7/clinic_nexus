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

    // primeiro verifica se médico existe
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
    // Usar id_medico diretamente para evitar erro de tipagem quando Agenda não tem relação 'medico' definida
    const conflito = await this.agendaRepository.findOne({
      where: {
        id_medico,
        data,
        hora_inicio,
        hora_fim,
      } as any, // cast para contornar diferenças sutis de tipagem entre colunas/relations
    });

    if (conflito) {
      throw new BadRequestException(
        'Já existe agenda cadastrada para este horário e data para este médico',
      );
    }

    // função pra criar agenda medica
    // Preenche a FK id_medico em vez de tentar passar o objeto 'medico' (compatível com ambos os designs)
    const agenda = this.agendaRepository.create({
      id_medico,
      data,
      hora_inicio,
      hora_fim,
      status: 'disponivel',
    } as any);

    return await this.agendaRepository.save(agenda);
  }

  // aqui listaremos as agendas
  async findAll() {
    // se sua entidade Agenda tiver relação 'medico', manter relations é bom; caso contrário, removê-las evita runtime errors
    return await this.agendaRepository.find({
      relations: ['medico', 'medico.funcionario'],
    } as any);
  }

  // lista todas as agendas (simples)
  async find() {
    return await this.agendaRepository.find();
  }

  // busca por ID
  async findOne(id: number) {
    const agenda = await this.agendaRepository.findOne({
      where: { id },
      relations: ['medico', 'medico.funcionario'],
    } as any);

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
