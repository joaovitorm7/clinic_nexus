import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- NOVO IMPORT
import { AgendaController } from './agenda.controller';
import { Medico } from '../medico/entities/medico.entity';
import { Agenda } from './entities/agenda.entity'; // <-- Importe sua entidade Agenda
import { AgendaService } from './agenda.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agenda, 
      Medico 
    ]),
  ],
  controllers: [AgendaController],
  providers: [AgendaService],
  exports: [AgendaService]
})
export class AgendaModule {}