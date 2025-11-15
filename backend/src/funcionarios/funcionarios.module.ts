import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioService } from './funcionarios.service';
import { FuncionariosController } from './funcionarios.controller';
import { Funcionario } from './entities/funcionario.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcionario, Usuario]), // <-- registra repositórios
  ],
  controllers: [FuncionariosController],
  providers: [FuncionarioService],
  exports: [FuncionarioService],
})
export class FuncionariosModule {}
