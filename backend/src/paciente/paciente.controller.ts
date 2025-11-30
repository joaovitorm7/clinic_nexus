import { Controller, Post, Body, Get, Param,Patch } from '@nestjs/common';
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

  @Get(':cpf')
  async findByCpf(@Param('cpf') cpf: string): Promise<Paciente[]> {
    return this.pacienteService.findByCpf(cpf);
  }
  @Get('id/:id')
  async findPacienteById(@Param('id') id: number): Promise<Paciente | null> {
    return this.pacienteService.findPacienteById(id);
  }
@Patch(':id')
update(
  @Param('id') id: number,
  @Body() updatePacienteDto: UpdatePacienteDto
) {
  return this.pacienteService.update(id, updatePacienteDto);
}

}
