import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './create-agendamento.dto';
export declare class AgendamentoController {
    private readonly agendamentoService;
    constructor(agendamentoService: AgendamentoService);
    create(dto: CreateAgendamentoDto): Promise<import("./entities/agendamento.entity").Agendamento>;
    findAll(): Promise<import("./entities/agendamento.entity").Agendamento[]>;
    findByDate(data: string): Promise<import("./entities/agendamento.entity").Agendamento[]>;
    findOne(id: number): Promise<import("./entities/agendamento.entity").Agendamento>;
    remove(id: number): Promise<void>;
}
