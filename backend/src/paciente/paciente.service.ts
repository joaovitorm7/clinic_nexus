import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteDto } from './create-paciente.dto';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    const paciente = this.pacienteRepository.create(createPacienteDto);

    try {
      return await this.pacienteRepository.save(paciente);
    } catch (error) {

      if (
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ENOTFOUND' ||
        error.code === '57P01' ||
        error.code === '08006'
      ) {
        throw new ServiceUnavailableException(
          'Serviço temporariamente indisponível. Tente novamente em instantes.',
        );
      }

      if (error.code === '23505') {
        throw new ConflictException('Paciente com este CPF já existe.');
      }

      console.error('Erro ao criar paciente:', error);
      throw new InternalServerErrorException('Erro ao criar paciente.');
    }
  }
  findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find();
  }

  findByCpf(cpf: string): Promise<Paciente[]> {
    return this.pacienteRepository.find({ where: { cpf } });
  }

  async findById(id: number): Promise<Paciente> {
    return this.pacienteRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updatePacienteDto: CreatePacienteDto): Promise<Paciente> {
    await this.pacienteRepository.update(id, updatePacienteDto);
    return this.pacienteRepository.findOne({ where: { id } });
  }
}
  