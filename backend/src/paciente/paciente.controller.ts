import { Controller, Post, Body, Get, Param, Put, Patch } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

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

  @Get('cpf/:cpf')
  async findByCpf(@Param('cpf') cpf: string): Promise<Paciente[]> {
    return this.pacienteService.findByCpf(cpf);
  }

  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<Paciente> {
    return this.pacienteService.findPacienteById(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto
  ): Promise<Paciente> {
    return this.pacienteService.update(Number(id), updatePacienteDto);
  }

  @Patch(':id')
  async patchUpdate(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto
  ): Promise<Paciente> {
    return this.pacienteService.update(Number(id), updatePacienteDto);
  }
}
