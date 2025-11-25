import { Repository } from 'typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { CreateAgendamentoDto } from './create-agendamento.dto';
export declare class AgendamentoService {
    private readonly agendamentoRepository;
    constructor(agendamentoRepository: Repository<Agendamento>);
    create(dto: CreateAgendamentoDto): Promise<Agendamento>;
    findAll(): Promise<Agendamento[]>;
    findOne(id: number): Promise<Agendamento | null>;
    findByDate(date: Date): Promise<Agendamento[]>;
    remove(id: number): Promise<void>;
}
