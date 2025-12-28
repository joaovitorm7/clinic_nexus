import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async criar(dados: Partial<Usuario>): Promise<Usuario> {
    const { email, senha } = dados;

    if (!email || !senha) {
      throw new BadRequestException('Email e senha são obrigatórios');
    }

    const existente = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (existente) {
      throw new BadRequestException('Usuário já cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = this.usuarioRepository.create({
      ...dados,
      senha: senhaHash,
    });

    return this.usuarioRepository.save(usuario);
  }

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async buscarPorId(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  async atualizar(
    id: number,
    dados: Partial<Usuario>,
  ): Promise<Usuario> {
    const usuario = await this.buscarPorId(id);

    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    Object.assign(usuario, dados);
    return this.usuarioRepository.save(usuario);
  }

  async deletar(id: number): Promise<void> {
    const usuario = await this.buscarPorId(id);
    await this.usuarioRepository.remove(usuario);
  }
}
