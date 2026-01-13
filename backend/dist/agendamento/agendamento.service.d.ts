import { Repository } from 'typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { AgendaService } from 'src/agenda/services/agenda.service';
import { Agenda } from 'src/agenda/entities/agenda.entity';
export declare class AgendamentoService {
    private readonly agendaRepository;
    private readonly agendamentoRepository;
    private readonly pacienteRepository;
    private readonly medicoRepository;
    private readonly funcionarioRepository;
    private readonly agendaService;
    constructor(agendaRepository: Repository<Agenda>, agendamentoRepository: Repository<Agendamento>, pacienteRepository: Repository<Paciente>, medicoRepository: Repository<Medico>, funcionarioRepository: Repository<Funcionario>, agendaService: AgendaService);
    create(dto: CreateAgendamentoDto): Promise<Agendamento>;
    findById(id: number): Promise<Agendamento>;
    update(id: number, dto: UpdateAgendamentoDto): Promise<Agendamento>;
    updateStatus(id: number, status: string): Promise<Agendamento>;
    cancelAgendamento(id: number): Promise<Agendamento>;
    findAgendamentosByPacienteId(pacienteId: number): Promise<Agendamento[]>;
    findAll(): Promise<Agendamento[]>;
    findOne(id: number): Promise<Agendamento | null>;
    findByDate(date: Date): Promise<Agendamento[]>;
    remove(id: number): Promise<void>;
}
