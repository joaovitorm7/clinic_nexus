import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Especialidade } from './entities/especialidade.entity';
import { Funcionario } from '../funcionarios/entities/funcionario.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,

    @InjectRepository(Especialidade)
    private readonly especialidadeRepository: Repository<Especialidade>,

    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {}

  async create(dto: CreateMedicoDto): Promise<Medico> {
    const funcionario = await this.funcionarioRepository.findOne({
      where: { id: dto.funcionarioId },
    });

    if (!funcionario) {
      throw new BadRequestException('Funcionário não encontrado');
    }

    const especialidade = await this.especialidadeRepository.findOne({
      where: { id: dto.especialidadeId },
    });

    if (!especialidade) {
      throw new BadRequestException('Especialidade inválida');
    }

    const medico = this.medicoRepository.create({
      id: dto.id,
      funcionario,
      crm: dto.crm,
      especialidade,
    });

    return this.medicoRepository.save(medico);
  }

  async findAll(nome?: string): Promise<Medico[]> {
    return this.medicoRepository.find({
      where: nome
        ? { funcionario: { nome: ILike(`%${nome}%`) } }
        : {},
      relations: ['funcionario', 'especialidade'],
      order: { funcionario: { nome: 'ASC' } },
    });
  }

  async findOne(id: number): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({
      where: { id },
      relations: ['funcionario', 'especialidade'],
    });

    if (!medico) {
      throw new NotFoundException(`Médico ${id} não encontrado`);
    }

    return medico;
  }

  async findByEspecialidadeId(especialidadeId: number): Promise<Medico[]> {
    return this.medicoRepository.find({
      where: { especialidade: { id: especialidadeId } },
      relations: ['funcionario', 'especialidade'],
    });
  }

  async getEspecialidadeByMedico(medicoId: number): Promise<Especialidade> {
    const medico = await this.medicoRepository.findOne({
      where: { id: medicoId },
      relations: ['especialidade'],
    });

    if (!medico) {
      throw new NotFoundException('Médico não encontrado');
    }

    return medico.especialidade;
  }

  async update(id: number, dto: UpdateMedicoDto): Promise<Medico> {
    const medico = await this.findOne(id);

    if (dto.especialidadeId) {
      const especialidade = await this.especialidadeRepository.findOne({
        where: { id: dto.especialidadeId },
      });

      if (!especialidade) {
        throw new BadRequestException('Especialidade inválida');
      }

      medico.especialidade = especialidade;
    }

    if (dto.crm !== undefined) {
      medico.crm = dto.crm;
    }

    return this.medicoRepository.save(medico);
  }

  async remove(id: number): Promise<void> {
    const medico = await this.findOne(id);
    await this.medicoRepository.remove(medico);
  }
}
