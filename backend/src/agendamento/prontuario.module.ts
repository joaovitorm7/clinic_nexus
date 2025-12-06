import { Prontuario } from "./entities/prontuario.entity";
import { ProntuarioController } from "./prontuario.controller";
import { ProntuarioService } from "./prontuario.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Agendamento } from "../agendamento/entities/agendamento.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Prontuario, Agendamento])],
  controllers: [ProntuarioController],
  providers: [ProntuarioService],
  exports: [ProntuarioService],
})
export class ProntuarioModule {}