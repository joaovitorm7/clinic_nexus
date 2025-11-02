import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './create-agendamento.dto';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post()
  create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return this.agendamentoService.create(createAgendamentoDto);
  }

  @Get()
  findAll() {
    return this.agendamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.agendamentoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.agendamentoService.remove(id);
  }
}
