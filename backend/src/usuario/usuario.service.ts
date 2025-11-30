import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async criar(usuario: Partial<Usuario>): Promise<Usuario> {
    const novoUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(novoUsuario);
  }

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

 async atualizar(id: number, dados: Partial<Usuario>): Promise<Usuario> {
  await this.usuarioRepository.update(id, dados);
  return this.usuarioRepository.findOneOrFail({ where: { id } });
}


  async deletar(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
