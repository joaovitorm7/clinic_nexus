import { 
  Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe 
} from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

import { EspecialidadeService } from './especialidade.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicoService.create(createMedicoDto);
  }

  @Get()
  findAll() {
    return this.medicoService.findAll();
  }

  @Get('especialidade/:especialidade_id')
  findByEspecialidade(
    @Param('especialidade_id', ParseIntPipe) especialidadeId: number
  ) {
    return this.medicoService.findByEspecialidadeId(especialidadeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicoDto: UpdateMedicoDto,
  ) {
    return this.medicoService.update(id, updateMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicoService.remove(id);
  }
}

@Controller('especialidades')
export class EspecialidadeController {
  constructor(
    private readonly especialidadeService: EspecialidadeService,
  ) {}

  @Post()
  create(@Body() dto: CreateEspecialidadeDto) {
    return this.especialidadeService.create(dto);
  }

  @Get()
  findAll() {
    return this.especialidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.especialidadeService.findOne(id);
  }
}
