import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FuncionarioService } from './funcionarios.service';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(
    private readonly funcionarioService: FuncionarioService,
  ) {}

  @Post()
  async create(@Body() data: {
    nome: string;
    cpf?: string;
    telefone?: string;
    cargo?: string;
    tipo?: string;
    email: string;
    senha: string;
    crm?: string;
    especialidadeId?: number;
  }) {
    return this.funcionarioService.createFuncionario(data);
  }

  @Get()
  async findAll() {
    return this.funcionarioService.findAll();
  }

  @Get('cpf/:cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    return this.funcionarioService.findByCpf(cpf);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.funcionarioService.findById(id);
  }
}
