import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamento } from '../agendamento/entities/agendamento.entity';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';
import { Medico } from 'src/medico/entities/medico.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Agendamento,Paciente,Medico,Funcionario])],
    controllers: [AgendamentoController],
    providers: [AgendamentoService],
})
export class AgendamentoModule { }
