import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- NOVO IMPORT
import { AgendaController } from './agenda.controller';
import { Medico } from 'src/medico/entities/medico.entity';
import { Agenda } from './entities/agenda.entity'; // <-- Importe sua entidade Agenda

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agenda, 
      Medico 
    ]),
  ],
  controllers: [AgendaController],
  
})
export class AgendaModule {}