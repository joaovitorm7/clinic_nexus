import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'chave_super_secreta'; // você pode colocar no .env
const JWT_EXPIRES_IN = '1h';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      return null;
    }

    // senha sem encriptação
    if (usuario.senha === senha) {
      const { senha, ...resultado } = usuario;
      return resultado;
    }

    return null;
  }

  async login(email: string, senha: string) {
    const usuario = await this.validarUsuario(email, senha);
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { email: usuario.email, sub: usuario.id };
    const access_token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return {
      access_token,
      usuario,
    };
  }

  // Método opcional para validar o token manualmente
  validarToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
