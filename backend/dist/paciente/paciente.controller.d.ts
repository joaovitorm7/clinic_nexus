import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
export declare class PacienteController {
    private readonly pacienteService;
    constructor(pacienteService: PacienteService);
    create(createPacienteDto: CreatePacienteDto): Promise<Paciente>;
    findAll(): Promise<Paciente[]>;
    findByCpf(cpf: string): Promise<Paciente[]>;
    findPacienteById(id: number): Promise<Paciente | null>;
    update(id: number, updatePacienteDto: UpdatePacienteDto): Promise<Paciente>;
}
