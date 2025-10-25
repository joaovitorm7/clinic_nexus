import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './create-paciente.dto';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private repositorioPaciente: Repository<Paciente>,
  ) {}

  async criarPaciente(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    const existe = await this.repositorioPaciente.findOne({
      where: { cpf: createPacienteDto.cpf },
    });

    if (existe) {
      throw new BadRequestException('Paciente com este CPF já existe');
    }

    const paciente = this.repositorioPaciente.create(createPacienteDto);
    return this.repositorioPaciente.save(paciente);
  }

  async listarPacientes(): Promise<Paciente[]> {
    return this.repositorioPaciente.find();
  }

  async buscarPacientePorId(id: number): Promise<Paciente> {
    const paciente = await this.repositorioPaciente.findOne({ where: { id } });
    if (!paciente) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado`);
    }
    return paciente;
  }
}
