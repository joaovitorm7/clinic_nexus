
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch
} from '@nestjs/common';
import { FuncionarioService } from './funcionarios.service';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
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

   @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.updateCompleto(id, dto);
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
  @Get('nome/:name')
  async findByName(@Param('name') name:string){
    return this.funcionarioService.FindFuncionarioByName(name);
  }
}
