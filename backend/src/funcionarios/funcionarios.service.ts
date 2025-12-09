import { Injectable, BadRequestException } from '@nestjs/common';
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
    cpf?: string;
    telefone?: string;
    cargo?: string;
    tipo?: string;
    email: string;
    senha: string;
    crm?: string;
    especialidadeId?: number;
  }): Promise<Funcionario> {
    const cargoValue = data.cargo ?? data.tipo ?? null;
    if (!cargoValue) throw new BadRequestException('cargo is required');

    return await this.funcionarioRepo.manager.transaction(async manager => {
      try {
        if (data.email) {
          const existingByEmail = await manager.findOne(Funcionario, { where: { email: data.email } });
          if (existingByEmail) throw new BadRequestException('Já existe um funcionário com este e-mail.');
        }
        if (data.cpf) {
          const existingByCpf = await manager.findOne(Funcionario, { where: { cpf: data.cpf } });
          if (existingByCpf) throw new BadRequestException('Já existe um funcionário com este CPF.');
        }

        const funcionario = manager.create(Funcionario, {
          nome: data.nome,
          cpf: data.cpf ?? null,
          telefone: data.telefone ?? null,
          email: data.email,
          cargo: cargoValue,
          senha: data.senha,
        });

        const savedFuncionario = await manager.save(funcionario);

        const cargoLower = (cargoValue ?? '').toString().toLowerCase();
        if (cargoLower === 'médico' || cargoLower === 'medico') {
          if (!data.crm || String(data.crm).trim() === '') {
            throw new BadRequestException('crm is required for medico');
          }
          if (!data.especialidadeId) {
            throw new BadRequestException('especialidadeId is required for medico');
          }
          const crmTrim = String(data.crm).trim();
          const existingMedicoByCrm = await manager.findOne(Medico, { where: { crm: crmTrim } });
          if (existingMedicoByCrm) {
            throw new BadRequestException('Já existe um médico com este CRM.');
          }

          const medico = manager.create(Medico, {
            crm: crmTrim,
            especialidade: { id: data.especialidadeId },
            funcionario: savedFuncionario,
          });

          await manager.save(medico);
        }

        return savedFuncionario;

      } catch (err) {
        if (err?.code === 'ER_DUP_ENTRY') {
          throw new BadRequestException('Já existe um registro com estes dados únicos (CPF, email ou CRM).');
        }
        throw err;
      }
    });
  }

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepo.find({ relations: ['medico'] });
  }

  async findById(id: number): Promise<Funcionario> {
    return this.funcionarioRepo.findOne({ where: { id }, relations: ['medico'] });
  }

  async findByEmail(email: string): Promise<Funcionario> {
    return this.funcionarioRepo.findOne({ where: { email } });
  }

  async findByCpf(cpf: string): Promise<Funcionario> {
    return this.funcionarioRepo.findOne({ where: { cpf } });
  }
}
