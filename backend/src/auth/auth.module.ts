import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from '../usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), // importa o repositório de usuários
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
