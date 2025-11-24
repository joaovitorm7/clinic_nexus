import { Paciente } from '../../paciente/entities/paciente.entity';
export declare class Agendamento {
    id: number;
    id_medico: number;
    paciente: Paciente;
    especialidade: string;
    data: Date;
    status: string;
    prontuario_path: string;
    motivo_consulta: string;
}
