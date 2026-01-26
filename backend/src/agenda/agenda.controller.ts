import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AgendaService } from './services/agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda-consulta.dto';
import { UpdateAgendaDataDto } from './dto/updateAgendaData.dto';
import { StatusAgenda } from './enums/status-agenda.enum';

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
  // BUSCAR AGENDA POR ID
  // ============================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaService.findOne(+id);
  }

  // ============================
  // LISTAR AGENDAS POR MÉDICO
  // ============================
  @Get('medico/:id_medico')
  findByMedico(
    @Param('id_medico') id_medico: string,
    @Query('status') status?: StatusAgenda,
    @Query('data') data?: string,
  ) {
    return this.agendaService.findByMedico(+id_medico, status, data);
  }

  // ============================
  // LISTAR HORÁRIOS DISPONÍVEIS DE UM MÉDICO
  // ============================
  @Get('medico/:id_medico/disponiveis')
  findDisponiveisByMedico(
    @Param('id_medico') id_medico: string,
    @Query('data') data?: string,
  ) {
    return this.agendaService.findAgendaDisponiveis(+id_medico, data);
  }

  // ============================
  // BUSCAR AGENDA POR MÉDICO E HORA
  // ============================
  @Get('medico/:id_medico/hora/:horaInicio')
  getAgendaIdByMedicoAndHora(
    @Param('id_medico') id_medico: string,
    @Param('horaInicio') horaInicio: string,
    @Query('data') data?: string,
  ) {
    return this.agendaService.findAgendaIdByMedicoAndHora(
      +id_medico,
      horaInicio,
      data,
    );
  }

  // ============================
  // ATUALIZAR AGENDA
  // ============================
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAgendaDto | UpdateAgendaDataDto,
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
