import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { FuncionarioService } from './funcionarios.service';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  async create(@Body() data: {
    nome: string;
    email: string;
    telefone: string;
    cargo: string;
    senha: string;
  }) {
    return this.funcionarioService.createFuncionario(data);
  }

  @Get()
  async findAll() {
    return `Retornar todos os funcionários`;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return `Retornar funcionário com id ${id}`;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: any,
  ) {
    return `Atualizar funcionário com id ${id}`;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return `Remover funcionário com id ${id}`;
  }
}
