import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';   
import { Medico } from './entities/medico.entity';
import { Especialidade } from './entities/especialidade.entity';
import { FuncionariosModule } from '../funcionarios/funcionarios.module';
import { Funcionario } from '../funcionarios/entities/funcionario.entity';
import { EspecialidadeService } from './especialidade.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medico, Especialidade, Funcionario]),
    FuncionariosModule,
  ],
  controllers: [MedicoController],
  providers: [MedicoService, EspecialidadeService],
  exports: [MedicoService],
})
export class MedicoModule {}
