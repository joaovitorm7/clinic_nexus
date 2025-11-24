import { Especialidade } from "./entities/especialidade.entity";
import { CreateEspecialidadeDto } from '../medico/dto/create-especialidade.dto';
import { EspecialidadeService } from './especialidade.service';
export declare class EspecialidadeController {
    private readonly especialidadeService;
    constructor(especialidadeService: EspecialidadeService);
    create(dto: CreateEspecialidadeDto): Promise<Especialidade>;
    findAll(): Promise<Especialidade[]>;
    findOne(id: number): Promise<Especialidade>;
}
