import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
export declare class MedicoController {
    private readonly medicoService;
    constructor(medicoService: MedicoService);
    create(createMedicoDto: CreateMedicoDto): Promise<import("./entities/medico.entity").Medico>;
    findAll(): Promise<import("./entities/medico.entity").Medico[]>;
    findOne(id: string): Promise<import("./entities/medico.entity").Medico>;
    update(id: string, updateMedicoDto: UpdateMedicoDto): Promise<import("./entities/medico.entity").Medico>;
    remove(id: string): Promise<import("./entities/medico.entity").Medico>;
}
