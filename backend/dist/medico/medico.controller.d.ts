import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { EspecialidadeService } from './especialidade.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
export declare class MedicoController {
    private readonly medicoService;
    constructor(medicoService: MedicoService);
    create(createMedicoDto: CreateMedicoDto): Promise<import("./entities/medico.entity").Medico>;
    findAll(): Promise<import("./entities/medico.entity").Medico[]>;
    findByEspecialidade(especialidadeId: number): Promise<import("./entities/medico.entity").Medico[]>;
    findOne(id: number): Promise<import("./entities/medico.entity").Medico>;
    update(id: number, updateMedicoDto: UpdateMedicoDto): Promise<import("./entities/medico.entity").Medico>;
    remove(id: number): Promise<import("./entities/medico.entity").Medico>;
}
export declare class EspecialidadeController {
    private readonly especialidadeService;
    constructor(especialidadeService: EspecialidadeService);
    create(dto: CreateEspecialidadeDto): Promise<import("./entities/especialidade.entity").Especialidade>;
    findAll(): Promise<import("./entities/especialidade.entity").Especialidade[]>;
    findOne(id: number): Promise<import("./entities/especialidade.entity").Especialidade>;
}
