import { Agendamento } from '../../agendamento/entities/agendamento.entity';
export declare class Paciente {
    id: number;
    nome: string;
    cpf: string;
    data_nascimento: Date;
    contato: string;
    endereco: string;
    agendamentos: Agendamento[];
}
