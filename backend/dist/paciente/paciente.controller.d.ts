import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './create-paciente.dto';
import { Paciente } from './entities/paciente.entity';
export declare class PacienteController {
    private readonly pacienteService;
    constructor(pacienteService: PacienteService);
    create(createPacienteDto: CreatePacienteDto): Promise<Paciente>;
    findAll(): Promise<Paciente[]>;
    findByCpf(cpf: string): Promise<Paciente[]>;
}
