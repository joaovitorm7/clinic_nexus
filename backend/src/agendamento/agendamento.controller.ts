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
  BadRequestException,
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
  
  @UseGuards(JwtAuthGuard)
  @Get('minhas-consultas')
  findMinhasConsultas(@Req() req) {
      const funcionarioId = Number(req.user.funcionarioId);
        if (isNaN(funcionarioId)) {
              throw new BadRequestException('funcionarioId inválido no token');
                }
                  return this.agendamentoService.findByMedico(funcionarioId);
  }



  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateAgendamentoDto) {
    return this.agendamentoService.create(dto);

  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.agendamentoService.findAll();
  }

  @Get('data/:data')
  @UseGuards(JwtAuthGuard)
  findByDate(@Param('data') data: string) {
    const date = new Date(data);
    return this.agendamentoService.findByDate(date);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agendamentoService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
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
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.agendamentoService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancelar')
  @HttpCode(HttpStatus.OK)
  async cancelar(@Param('id', ParseIntPipe) id: number): Promise<Agendamento> {
    return await this.agendamentoService.cancelAgendamento(id);
  }
}
