import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacienteModule } from './paciente/paciente.module';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { Especialidade } from './medico/entities/especialidade.entity';
import { EspecialidadeModule } from './medico/especialidade.module';
import { MedicoModule } from './medico/medico.module';
import { AgendaModule } from './agenda/agenda.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
      validate: (config) => {
        const requiredVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS', 'DB_NAME', 'DB_SYNC'];
        requiredVars.forEach((v) => {
          if (!config[v]) {
            throw new Error(`Missing environment variable: ${v}`);
          }
        });
        return config;
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('DB_SYNC') === 'true',
      }),
    }),
    PacienteModule,
    UsuarioModule,
    AuthModule,
    AgendamentoModule,
    EspecialidadeModule,
    MedicoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
