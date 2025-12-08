import {
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { ProntuarioService } from './prontuario.service';
import { CreateProntuarioDto } from './dto/create-prontuario.dto';
import { UpdateProntuarioDto } from './dto/update-prontuario.dto';
import { Prontuario } from './entities/prontuario.entity';

@Controller('prontuario')
export class ProntuarioController {
  constructor(private readonly prontuarioService: ProntuarioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createDto: CreateProntuarioDto): Promise<Prontuario> {
    return this.prontuarioService.create(createDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Prontuario[]> {
    return this.prontuarioService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Prontuario> {
    return this.prontuarioService.findOne(id);
  }

  @Get('agendamento/:agendamentoId')
  @HttpCode(HttpStatus.OK)
  async findByAgendamento(
    @Param('agendamentoId', ParseIntPipe) agendamentoId: number,
  ): Promise<Prontuario | null> {
    return this.prontuarioService.findByAgendamentoId(agendamentoId);
  }

  @Get('paciente/:id')
  @HttpCode(HttpStatus.OK)
  async findByPaciente(@Param('id', ParseIntPipe) id: number): Promise<Prontuario[]> {
    return this.prontuarioService.findByPacienteId(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  async replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProntuarioDto,
  ): Promise<Prontuario> {
    return this.prontuarioService.update(id, updateDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProntuarioDto,
  ): Promise<Prontuario> {
    return this.prontuarioService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.prontuarioService.remove(id);
  }
}
