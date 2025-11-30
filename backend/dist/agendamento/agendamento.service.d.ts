import { Repository } from 'typeorm';
import { Agendamento } from './agendamento.entity';
import { CreateAgendamentoDto } from './create-agendamento.dto';
export declare class AgendamentoService {
    private readonly agendamentoRepository;
    constructor(agendamentoRepository: Repository<Agendamento>);
    create(dto: CreateAgendamentoDto): Promise<Agendamento>;
    findAll(): Promise<Agendamento[]>;
    findOne(id: number): Promise<Agendamento | null>;
    remove(id: number): Promise<void>;
}
