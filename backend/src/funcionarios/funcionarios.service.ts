import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { Funcionario } from './entities/funcionario.entity';
import { Medico } from '../medico/entities/medico.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepo: Repository<Funcionario>,

    @InjectRepository(Medico)
    private readonly medicoRepo: Repository<Medico>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

    private readonly dataSource: DataSource,
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
    const cargoValue = data.cargo ?? data.tipo;
    if (!cargoValue) {
      throw new BadRequestException('cargo is required');
    }

    return this.dataSource.transaction(async manager => {
      if (data.cpf) {
        const existsCpf = await manager.findOne(Funcionario, {
          where: { cpf: data.cpf },
        });
        if (existsCpf) {
          throw new BadRequestException('CPF já cadastrado');
        }
      }

      const funcionario = manager.create(Funcionario, {
        nome: data.nome,
        cpf: data.cpf ?? null,
        telefone: data.telefone ?? null,
        cargo: cargoValue,
      });

      const savedFuncionario = await manager.save(funcionario);

      const senhaHash = await bcrypt.hash(data.senha, 10);

      const usuario = manager.create(Usuario, {
        email: data.email,
        senha: senhaHash,
        funcionario: savedFuncionario,
      });

      await manager.save(usuario);

      const cargoLower = cargoValue.toLowerCase();
      if (cargoLower === 'médico' || cargoLower === 'medico') {
        if (!data.crm || !data.especialidadeId) {
          throw new BadRequestException(
            'crm e especialidadeId são obrigatórios para médico',
          );
        }

        const medico = manager.create(Medico, {
          crm: data.crm.trim(),
          especialidade: { id: data.especialidadeId } as any,
          funcionario: savedFuncionario,
        });

        await manager.save(medico);
      }

      return savedFuncionario;
    });
  }

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepo.find({
      relations: ['medico'],
      order: { nome: 'ASC' },
    });
  }

  async findById(id: number): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepo.findOne({
      where: { id },
      relations: ['medico'],
    });

    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return funcionario;
  }

  async findByCpf(cpf: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepo.findOne({
      where: { cpf },
      relations: ['medico'],
    });

    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return funcionario;
  }

  async updateCompleto(
    id: number,
    dto: UpdateFuncionarioDto,
  ): Promise<Funcionario> {
    return this.dataSource.transaction(async manager => {
      const funcionario = await manager.findOne(Funcionario, {
        where: { id },
        relations: ['medico'],
      });

      if (!funcionario) {
        throw new NotFoundException('Funcionário não encontrado');
      }

      const { crm, especialidadeId, ...dadosFuncionario } = dto;

      Object.assign(funcionario, dadosFuncionario);
      await manager.save(funcionario);

      if (funcionario.medico && (crm || especialidadeId)) {
        if (crm !== undefined) {
          funcionario.medico.crm = crm.trim();
        }

        if (especialidadeId !== undefined) {
          funcionario.medico.especialidade = {
            id: especialidadeId,
          } as any;
        }

        await manager.save(funcionario.medico);
      }

      return funcionario;
    });
  }

  async desativar(id: number): Promise<Funcionario> {
    const funcionario = await this.findById(id);

    if (funcionario.data_desativacao) {
      throw new BadRequestException('Funcionário já está desativado');
    }

    funcionario.data_desativacao = new Date();
    return this.funcionarioRepo.save(funcionario);
  }

  async ativar(id: number): Promise<Funcionario> {
    const funcionario = await this.findById(id);

    if (!funcionario.data_desativacao) {
      throw new BadRequestException('Funcionário já está ativo');
    }

    funcionario.data_desativacao = null;
    return this.funcionarioRepo.save(funcionario);
  }

  async remove(id: number): Promise<void> {
    const funcionario = await this.findById(id);
    await this.funcionarioRepo.remove(funcionario);
  }
}
