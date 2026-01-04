import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamento } from '../agendamento/entities/agendamento.entity';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';
import { Medico } from 'src/medico/entities/medico.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { AgendaModule } from 'src/agenda/agenda.module';
import { Agenda } from 'src/agenda/entities/agenda.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Agendamento,Paciente,Medico,Funcionario,Agenda]), AgendaModule],
    controllers: [AgendamentoController],
    providers: [AgendamentoService],
})
export class AgendamentoModule { }
