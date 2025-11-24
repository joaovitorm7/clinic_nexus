import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Especialidade } from './entities/especialidade.entity';
import { Funcionario } from '../funcionarios/entities/funcionario.entity';
export declare class MedicoService {
    private readonly medicoRepository;
    private readonly especialidadeRepository;
    private readonly funcionarioRepository;
    constructor(medicoRepository: Repository<Medico>, especialidadeRepository: Repository<Especialidade>, funcionarioRepository: Repository<Funcionario>);
    create(createMedicoDto: CreateMedicoDto): Promise<Medico>;
    findAll(): Promise<Medico[]>;
    findOne(id: number): Promise<Medico>;
    update(id: number, updateMedicoDto: UpdateMedicoDto): Promise<Medico>;
    remove(id: number): Promise<Medico>;
}
