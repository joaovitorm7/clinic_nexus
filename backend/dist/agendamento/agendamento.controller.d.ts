import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { Agendamento } from './entities/agendamento.entity';
export declare class AgendamentoController {
    private readonly agendamentoService;
    constructor(agendamentoService: AgendamentoService);
    create(dto: CreateAgendamentoDto): Promise<Agendamento>;
    findAll(): Promise<Agendamento[]>;
    findByDate(data: string): Promise<Agendamento[]>;
    findOne(id: number): Promise<Agendamento>;
    patch(id: number, dto: UpdateAgendamentoDto): Promise<Agendamento>;
    remove(id: number): Promise<void>;
    cancelar(id: number): Promise<Agendamento>;
}
