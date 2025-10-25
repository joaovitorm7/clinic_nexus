import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async validarUsuario(email: string, senha: string): Promise<Omit<Usuario, 'senha'> | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      return null;
    }

    // senha sem encriptação
    if (usuario.senha === senha) {
      const { senha: _, ...resultado } = usuario;
      return resultado;
    }

    return null;
  }

  async login(email: string, senha: string) {
    const usuario = await this.validarUsuario(email, senha);
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Retorna apenas o usuário sem token
    return { usuario };
  }
}
