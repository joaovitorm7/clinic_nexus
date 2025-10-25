import { Post, Body} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';


@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.listar();
  }

  @Post()
  create(@Body() usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.criar(usuario);
  }

 @Get(':id')
async buscarPorId(@Param('id') id: string): Promise<Usuario> {
  const usuario = await this.usuarioService.buscarPorId(Number(id));
  if (!usuario) {
    throw new NotFoundException(`Usuário com id ${id} não encontrado`);
  }
  return usuario;
}

}
