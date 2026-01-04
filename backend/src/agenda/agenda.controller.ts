import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgendaService } from './services/agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda-consulta.dto';

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  // ============================
  // CRIAR AGENDA / SLOT
  // ============================
  @Post()
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.agendaService.create(createAgendaDto);
  }

  // ============================
  // LISTAR TODAS AS AGENDAS
  // ============================
  @Get()
  findAll() {
    return this.agendaService.findAll();
  }

  // ============================
  // LISTAR AGENDAS POR MÉDICO
  // ============================
  @Get('medico/:id_medico')
  findByMedico(@Param('id_medico') id_medico: string) {
    return this.agendaService.findByMedico(+id_medico);
  }

  // ============================
  // BUSCAR AGENDA POR ID
  // ============================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaService.findOne(+id);
  }

  // ============================
  // ATUALIZAR AGENDA
  // ============================
  @Patch(':id')
update(
  @Param('id') id: string,
  @Body() dto: UpdateAgendaDto,
) {
  return this.agendaService.update(+id, dto);
}



  // ============================
  // REMOVER AGENDA
  // ============================
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendaService.remove(+id);
  }
}
