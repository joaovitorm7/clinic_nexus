import { Medico } from '../../medico/entities/medico.entity';
export declare class Funcionario {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    cargo: string;
    data_desativacao: Date | null;
    senha: string;
    medico?: Medico;
}
