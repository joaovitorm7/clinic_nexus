import { Controller, Post, Body, Get } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './create-paciente.dto';
import { Paciente } from './paciente.entity';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  async create(@Body() createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    return this.pacienteService.create(createPacienteDto);
  }

  @Get()
  async findAll(): Promise<Paciente[]> {
    return this.pacienteService.findAll();
  }
}
