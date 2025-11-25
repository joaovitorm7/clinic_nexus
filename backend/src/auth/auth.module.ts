import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Funcionario]), // importa o repositório de usuários
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
