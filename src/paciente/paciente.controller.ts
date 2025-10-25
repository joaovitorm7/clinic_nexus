import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './create-paciente.dto';
import { Paciente } from './paciente.entity';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  async criarPaciente(@Body() createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    return this.pacienteService.criarPaciente(createPacienteDto);
  }

  @Get()
  async listarPacientes(): Promise<Paciente[]> {
    return this.pacienteService.listarPacientes();
  }

  @Get(':id')
  async buscarPacientePorId(@Param('id', ParseIntPipe) id: number): Promise<Paciente> {
    return this.pacienteService.buscarPacientePorId(id);
  }
}
