import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacienteModule } from './paciente/paciente.module';
import { ConfigModule } from '@nestjs/config';

@Module({
imports: [
  ConfigModule.forRoot({ isGlobal: true }), // carrega .env
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true, 
  }),
  AuthModule,
  UsuarioModule,
  PacienteModule,
],

 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
