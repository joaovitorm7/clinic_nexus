import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaService } from './services/agenda.service';
import { AgendaController } from './agenda.controller';
import { Agenda } from './entities/agenda.entity';
import { Medico } from '../medico/entities/medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda, Medico])],
  controllers: [AgendaController],
  providers: [AgendaService],
  exports: [AgendaService],
})
export class AgendaModule {}

