import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';   
import { Medico } from './entities/medico.entity';
import { Especialidade } from './entities/especialidade.entity';
import { FuncionariosModule } from '../funcionarios/funcionarios.module';
import { Funcionario } from '../funcionarios/entities/funcionario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medico, Especialidade, Funcionario]),
    FuncionariosModule,
  ],
  controllers: [MedicoController],      
  providers: [MedicoService],
  exports: [MedicoService],
})
export class MedicoModule {}
