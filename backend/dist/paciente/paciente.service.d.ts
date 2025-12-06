import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
export declare class PacienteService {
    private readonly pacienteRepository;
    pacienteRepo: any;
    constructor(pacienteRepository: Repository<Paciente>);
    create(createPacienteDto: CreatePacienteDto): Promise<Paciente>;
    findAll(): Promise<Paciente[]>;
    findByCpf(cpf: string): Promise<Paciente[]>;
    findPacienteById(id: number): Promise<Paciente | null>;
    update(id: any, dto: UpdatePacienteDto): Promise<Paciente>;
}
