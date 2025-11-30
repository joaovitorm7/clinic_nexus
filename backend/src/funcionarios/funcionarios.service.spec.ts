import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from '../medico/entities/medico.entity';

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
    telefone: string;
    cargo: string; // agora apenas texto
    crm?: string;
    especialidadeId?: number;
  }) {

    // 1️⃣ Cria funcionário simples
    const funcionario = this.funcionarioRepo.create({
      nome: data.nome,
      telefone: data.telefone,
      cargo: data.cargo,
    });

    await this.funcionarioRepo.save(funcionario);

    // 2️⃣ Se cargo for médico → cria registro na tabela Medico
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
}
