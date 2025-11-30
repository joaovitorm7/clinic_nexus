import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async create(createMedicoDto: CreateMedicoDto): Promise<Medico> {
    const funcionario = await this.funcionarioRepository.findOne({ 
      where: { id: createMedicoDto.funcionarioId } 
    });
    if (!funcionario) {
      throw new BadRequestException('Funcionário inválido ou não encontrado');
    }

    const especialidade = await this.especialidadeRepository.findOne({ 
      where: { id: createMedicoDto.especialidadeId } 
    });
    if (!especialidade) {
      throw new BadRequestException('Especialidade inválida');
    }

    const medico = this.medicoRepository.create({
      funcionario,
      crm: createMedicoDto.crm,
      especialidade,
    });

    return this.medicoRepository.save(medico);
  }

  findAll(): Promise<Medico[]> {
    return this.medicoRepository.find({
      relations: ['especialidade', 'funcionario'],
    });
  }

  async findOne(id: number): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({
      where: { id },
      relations: ['especialidade', 'funcionario'],
    });

    if (!medico) {
      throw new NotFoundException(`Médico com id ${id} não encontrado`);
    }

    return medico;
  }

  async findByEspecialidadeId(especialidadeId: number): Promise<Medico[]> {
    return this.medicoRepository.find({
      where: { especialidade: { id: especialidadeId } },
      relations: ['especialidade', 'funcionario'],
    });
  }

  async update(id: number, updateMedicoDto: UpdateMedicoDto): Promise<Medico> {
    const medico = await this.findOne(id);

    if (updateMedicoDto.especialidadeId) {
      const especialidade = await this.especialidadeRepository.findOne({
        where: { id: updateMedicoDto.especialidadeId },
      });
      if (!especialidade) {
        throw new BadRequestException('Especialidade inválida');
      }
      medico.especialidade = especialidade;
    }

    Object.assign(medico, updateMedicoDto);

    return this.medicoRepository.save(medico);
  }

  async remove(id: number): Promise<Medico> {
    const medico = await this.findOne(id);
    return this.medicoRepository.remove(medico);
  }
}
