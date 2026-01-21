import { Injectable, UnauthorizedException } from '@nestjs/common';
//import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async validarUsuario(email: string, senha: string) {
    const usuario = await this.usuarioService.buscarPorEmail(email);
    if (!usuario) throw new UnauthorizedException('Usuário não encontrado');

    if (usuario.status !== 'Ativo')
      throw new UnauthorizedException('Usuário inativo');

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida)
      throw new UnauthorizedException('Senha incorreta');
    const senha = 123;

    return usuario;
  }

}
