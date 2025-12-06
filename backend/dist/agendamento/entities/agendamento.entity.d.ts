import { Paciente } from '../../paciente/entities/paciente.entity';
import { Medico } from '../../medico/entities/medico.entity';
export declare class Agendamento {
    id: number;
    paciente: Paciente;
    medico: Medico;
    data: Date;
    status: string;
    motivo_consulta: string;
}
