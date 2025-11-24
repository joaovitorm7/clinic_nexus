import { Paciente } from '../../paciente/entities/paciente.entity';
export declare class Prontuario {
    id: number;
    paciente: Paciente;
    dataRegistro: Date;
    diagnostico: string;
    observacoes?: string;
    medicamentosPrescritos?: string;
    procedimentos?: string;
    anexos?: any;
    criadoEm: Date;
    atualizadoEm: Date;
}
