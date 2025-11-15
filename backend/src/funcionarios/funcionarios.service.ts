import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepo: Repository<Funcionario>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async createFuncionario(data: {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  senha: string;
}) {
  const usuario = this.usuarioRepo.create({
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    status: 'ativo',
  });
  await this.usuarioRepo.save(usuario);

  const funcionario = this.funcionarioRepo.create({
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    cargo: data.cargo,
    usuario, 
  });

  return this.funcionarioRepo.save(funcionario);
}

}
