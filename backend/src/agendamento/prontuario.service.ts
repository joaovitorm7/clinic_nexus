import { Injectable, NotFoundException } from '@nestjs/common';
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
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id: createProntuarioDto.agendamentoId },
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    await this.agendamentoRepository.update(
      { id: agendamento.id },
      { status: 'realizada' },
    );

    const prontuario = this.prontuarioRepository.create({
      agendamento,
      data_atendimento: createProntuarioDto.data_atendimento
        ? new Date(createProntuarioDto.data_atendimento)
        : null,
      queixa_principal: createProntuarioDto.queixa_principal ?? null,
      anamnese: createProntuarioDto.anamnese ?? null,
      exames_vitais: createProntuarioDto.exames_vitais ?? null,
      diagnostico: createProntuarioDto.diagnostico ?? null,
      evolucao_clinica: createProntuarioDto.evolucao_clinica ?? null,
      conduta: createProntuarioDto.conduta ?? null,
      encaminhamento: createProntuarioDto.encaminhamento ?? null,
      medicacoes_prescritas: createProntuarioDto.medicacoes_prescritas ?? null,
      observacoes: createProntuarioDto.observacoes ?? null,
    });

    return this.prontuarioRepository.save(prontuario);
  }

  async update(id: number, updateProntuarioDto: UpdateProntuarioDto): Promise<Prontuario> {
    const prontuario = await this.prontuarioRepository.findOne({ where: { id } });

    if (!prontuario) {
      throw new NotFoundException('Prontuário não encontrado');
    }

    const updatableFields: Partial<Prontuario> = {
      data_atendimento: updateProntuarioDto.data_atendimento
        ? new Date(updateProntuarioDto.data_atendimento)
        : prontuario.data_atendimento,
      queixa_principal: updateProntuarioDto.queixa_principal ?? prontuario.queixa_principal,
      anamnese: updateProntuarioDto.anamnese ?? prontuario.anamnese,
      exames_vitais: updateProntuarioDto.exames_vitais ?? prontuario.exames_vitais,
      diagnostico: updateProntuarioDto.diagnostico ?? prontuario.diagnostico,
      evolucao_clinica: updateProntuarioDto.evolucao_clinica ?? prontuario.evolucao_clinica,
      conduta: updateProntuarioDto.conduta ?? prontuario.conduta,
      encaminhamento: updateProntuarioDto.encaminhamento ?? prontuario.encaminhamento,
      medicacoes_prescritas: updateProntuarioDto.medicacoes_prescritas ?? prontuario.medicacoes_prescritas,
      observacoes: updateProntuarioDto.observacoes ?? prontuario.observacoes,
    };

    Object.assign(prontuario, updatableFields);

    return this.prontuarioRepository.save(prontuario);
  }

  async findByAgendamentoId(agendamentoId: number): Promise<Prontuario | null> {
    return this.prontuarioRepository.findOne({
      where: { agendamento: { id: agendamentoId } },
      relations: ['agendamento'],
    });
  }

  async findByPacienteId(pacienteId: number): Promise<Prontuario[]> {
    return this.prontuarioRepository
      .createQueryBuilder('prontuario')
      .leftJoinAndSelect('prontuario.agendamento', 'agendamento')
      .leftJoinAndSelect('agendamento.paciente', 'paciente')
      .where('paciente.id = :pacienteId', { pacienteId })
      .getMany();
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
