import { Especialidade } from "./entities/especialidade.entity";
import { Repository } from 'typeorm';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
export declare class EspecialidadeService {
    private readonly especialidadeRepository;
    constructor(especialidadeRepository: Repository<Especialidade>);
    create(createEspecialidadeDto: CreateEspecialidadeDto): Promise<Especialidade>;
    findAll(): Promise<Especialidade[]>;
    findOne(id: number): Promise<Especialidade>;
}
