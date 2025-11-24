import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteDto } from './create-paciente.dto';
export declare class PacienteService {
    private readonly pacienteRepository;
    constructor(pacienteRepository: Repository<Paciente>);
    create(createPacienteDto: CreatePacienteDto): Promise<Paciente>;
    findAll(): Promise<Paciente[]>;
    findByCpf(cpf: string): Promise<Paciente[]>;
}
