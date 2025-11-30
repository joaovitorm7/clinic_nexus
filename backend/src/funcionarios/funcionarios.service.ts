import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from '../medico/entities/medico.entity';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepo: Repository<Funcionario>,

    @InjectRepository(Medico)
    private readonly medicoRepo: Repository<Medico>,
  ) {}

  async createFuncionario(data: {
    nome: string;
    telefone?: string;
    cargo: string;
    email: string;
    senha: string;
    crm?: string;
    especialidadeId?: number;
  }): Promise<Funcionario> {

    const funcionario = this.funcionarioRepo.create({
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      cargo: data.cargo,
      senha: data.senha, 
    });

    await this.funcionarioRepo.save(funcionario);

    if (data.cargo.toLowerCase() === 'médico' || data.cargo.toLowerCase() === 'medico') {
      const medico = this.medicoRepo.create({
        crm: data.crm ?? null,
        especialidade: data.especialidadeId ? { id: data.especialidadeId } : null,
        funcionario,
      });

      await this.medicoRepo.save(medico);
    }

    return funcionario;
  }

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepo.find({ relations: ['medico'] });
  }

  async findById(id: number): Promise<Funcionario> {
    return this.funcionarioRepo.findOne({ where: { id }, relations: ['medico'] });
  }
  async findByEmail(email:string): Promise<Funcionario>{
    return this.funcionarioRepo.findOne({where:{email}})
  }
  async findByCpf(cpf:string):Promise<Funcionario>{
    return this.funcionarioRepo.findOne({where:{cpf}})
  }
}
