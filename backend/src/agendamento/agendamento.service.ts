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
    ) {}

async create(dto: CreateAgendamentoDto): Promise<Agendamento> {
  const agendamento = this.agendamentoRepository.create({
    ...dto,
    paciente: dto.id_paciente ? { id: dto.id_paciente } : null
  });
  return await this.agendamentoRepository.save(agendamento);
}



 async findAll(): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      relations: ['paciente'], 
    });
    }

    async findOne(id: number): Promise<Agendamento | null> {
    return this.agendamentoRepository.findOne({
        where: { id },
        relations: ['paciente'], 
    });
}


    async remove(id: number): Promise<void> {
        await this.agendamentoRepository.delete(id);
    }
}
