import { Funcionario } from '../funcionarios/entities/funcionario.entity';
export declare class Usuario {
    id: number;
    funcionario: Funcionario;
    nome: string;
    email: string;
    senha: string;
    status: string;
}
