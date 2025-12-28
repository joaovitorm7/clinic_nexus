import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async validarUsuario(
    email: string,
    senha: string,
  ): Promise<Omit<Usuario, 'senha'> | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
      relations: ['funcionario'],
    });

    if (!usuario) {
      return null;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return null;
    }

    const { senha: _, ...resultado } = usuario;
    return resultado;
  }

  async login(email: string, senha: string) {
    const usuario = await this.validarUsuario(email, senha);

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return { usuario };
  }
}
