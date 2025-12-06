import { Repository } from 'typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Medico } from '../medico/entities/medico.entity';
export declare class FuncionarioService {
    private readonly funcionarioRepo;
    private readonly medicoRepo;
    constructor(funcionarioRepo: Repository<Funcionario>, medicoRepo: Repository<Medico>);
    createFuncionario(data: {
        nome: string;
        telefone?: string;
        cargo: string;
        email: string;
        senha: string;
        crm?: string;
        especialidadeId?: number;
    }): Promise<Funcionario>;
    findAll(): Promise<Funcionario[]>;
    findById(id: number): Promise<Funcionario>;
    findByEmail(email: string): Promise<Funcionario>;
    findByCpf(cpf: string): Promise<Funcionario>;
}
