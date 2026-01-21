import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  HttpCode,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  UseGuards,
  Req,
  ValidationPipeOptions,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { Agendamento } from './entities/agendamento.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) { }

  @Post()
  create(@Body() dto: CreateAgendamentoDto) {
    return this.agendamentoService.create(dto);



  }

  @Get()
  findAll() {
    return this.agendamentoService.findAll();
  }

  @Get('data/:data')
  findByDate(@Param('data') data: string) {
    const date = new Date(data);
    return this.agendamentoService.findByDate(date);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agendamentoService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAgendamentoDto,
  ): Promise<Agendamento> {
    return await this.agendamentoService.update(id, dto);
  }

@UseGuards(JwtAuthGuard)
@Get('minhas') // rota exclusiva para o médico logado
async getMinhasConsultas(@Req() req) {
  const medicoId = req.user.funcionarioId; // pega do JWT
  return this.agendamentoService.findByMedico(medicoId);
}
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.agendamentoService.remove(id);
  }

  @Patch(':id/cancelar')
  @HttpCode(HttpStatus.OK)
  async cancelar(@Param('id', ParseIntPipe) id: number): Promise<Agendamento> {
    return await this.agendamentoService.cancelAgendamento(id);
  }
}
