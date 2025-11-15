import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoService } from './medico.service';
import { Medico } from './entities/medico.entity';
import { Especialidade } from './entities/especialidade.entity';
import { FuncionariosModule } from '../funcionarios/funcionarios.module';
import { Funcionario } from '../funcionarios/entities/funcionario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medico, Especialidade, Funcionario]), // registra repositórios
    FuncionariosModule, // importa módulo que exporta FuncionarioRepository
  ],
  providers: [MedicoService],
  exports: [MedicoService],
})
export class MedicoModule {}
