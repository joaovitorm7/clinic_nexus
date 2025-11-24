import { Funcionario } from '../../funcionarios/entities/funcionario.entity';
import { Especialidade } from './especialidade.entity';
export declare class Medico {
    id: number;
    funcionario: Funcionario;
    especialidade: Especialidade;
    crm: string;
}
