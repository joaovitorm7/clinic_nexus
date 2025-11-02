import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamento } from './agendamento.entity';
import { CreateAgendamentoDto } from './create-agendamento.dto';

@Injectable()
export class AgendamentoService {
    constructor(
        @InjectRepository(Agendamento)
        private readonly agendamentoRepository: Repository<Agendamento>,
    ) { }

    async create(createAgendamentoDto: CreateAgendamentoDto): Promise<Agendamento> {
        const novoAgendamento = this.agendamentoRepository.create(createAgendamentoDto);
        return await this.agendamentoRepository.save(novoAgendamento);
    }

    async findAll(): Promise<Agendamento[]> {
        return this.agendamentoRepository.find();
    }

    async findOne(id: number): Promise<Agendamento | null> {
        return await this.agendamentoRepository.findOne({
            where: { id: id },
        });
    }
    
    async remove(id: number): Promise<void> {
        await this.agendamentoRepository.delete(id);
    }
}
