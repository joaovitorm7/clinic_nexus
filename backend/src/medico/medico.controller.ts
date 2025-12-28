import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MedicoService } from './medico.service';
import { EspecialidadeService } from './especialidade.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Controller('medico')
export class MedicoController {
  constructor(
    private readonly medicoService: MedicoService,
    private readonly especialidadeService: EspecialidadeService,
  ) {}

  @Post()
  create(@Body() dto: CreateMedicoDto) {
    return this.medicoService.create(dto);
  }

  @Get()
  findAll(@Query('nome') nome?: string) {
    return this.medicoService.findAll(nome);
  }

  @Get('especialidades')
  findAllEspecialidades() {
    return this.especialidadeService.findAll();
  }

  @Get('especialidade/:especialidadeId')
  findByEspecialidade(
    @Param('especialidadeId', ParseIntPipe) especialidadeId: number,
  ) {
    return this.medicoService.findByEspecialidadeId(especialidadeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicoService.findOne(id);
  }

  @Get(':id/especialidade')
  getEspecialidade(@Param('id', ParseIntPipe) id: number) {
    return this.medicoService.getEspecialidadeByMedico(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMedicoDto,
  ) {
    return this.medicoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicoService.remove(id);
  }
}
