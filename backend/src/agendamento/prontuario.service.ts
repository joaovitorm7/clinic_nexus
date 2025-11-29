import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prontuario } from './entities/prontuario.entity';
import { Agendamento } from '../agendamento/entities/agendamento.entity';
import { CreateProntuarioDto } from './dto/create-prontuario.dto';
import { UpdateProntuarioDto } from './dto/update-prontuario.dto';

@Injectable()
export class ProntuarioService {
  constructor(
    @InjectRepository(Prontuario)
    private readonly prontuarioRepository: Repository<Prontuario>,

    @InjectRepository(Agendamento)
    private readonly agendamentoRepository: Repository<Agendamento>,
  ) {}

  async create(createProntuarioDto: CreateProntuarioDto): Promise<Prontuario> {
    const agendamento = await this.agendamentoRepository.findOne({ where: { id: createProntuarioDto.agendamentoId } });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    const prontuario = this.prontuarioRepository.create({
      agendamento,
      evolucao_clinica: createProntuarioDto.evolucao_clinica,
      encaminhamento: createProntuarioDto.encaminhamento,
      conduta: createProntuarioDto.conduta,
    });

    return this.prontuarioRepository.save(prontuario);
  }

  async update(id: number, updateProntuarioDto: UpdateProntuarioDto): Promise<Prontuario> {
    const prontuario = await this.prontuarioRepository.findOne({ where: { id } });

    if (!prontuario) {
      throw new NotFoundException('Prontuário não encontrado');
    }

    Object.assign(prontuario, updateProntuarioDto);
    return this.prontuarioRepository.save(prontuario);
  }
  async findByAgendamentoId(agendamentoId: number): Promise<Prontuario | null> {
    return this.prontuarioRepository.findOne({
      where: { agendamento: { id: agendamentoId } },
      relations: ['agendamento'],
    });
  }

  async findAll(): Promise<Prontuario[]> {
    return this.prontuarioRepository.find({ relations: ['agendamento'] });
  }

  async findOne(id: number): Promise<Prontuario> {
    const prontuario = await this.prontuarioRepository.findOne({
      where: { id },
      relations: ['agendamento'],
    });

    if (!prontuario) {
      throw new NotFoundException('Prontuário não encontrado');
    }

    return prontuario;
  }
  async remove(id: number): Promise<void> {
    const prontuario = await this.prontuarioRepository.findOne({ where: { id } });

    if (!prontuario) {
      throw new NotFoundException('Prontuário não encontrado');
    }

    await this.prontuarioRepository.remove(prontuario);
  }
}